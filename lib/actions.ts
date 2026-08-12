"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { awardTypes, deliverables, interests, rubricDefaults } from "@/lib/constants";
import { assertMutationAllowed } from "@/lib/app-config";
import {
  AccountStatus,
  AwardStatus,
  AwardType,
  type AwardTypeValue,
  ChallengeCategory,
  ChallengeStatus,
  GuardianApprovalStatus,
  OrganizationStatus,
  OrganizationType,
  OrganizationVerificationStatus,
  Role,
  TeamMemberStatus,
  TeamRole,
  TeamStatus,
  UserStatus,
  type ChallengeStatusValue
} from "@/lib/db-types";
import {
  createSession,
  getCurrentUser,
  hashPassword,
  requireAdmin,
  requireOrganization,
  requireStudent,
  sanitizeRedirectUrl,
  verifyPassword,
  validatePassword
} from "@/lib/auth";
import { assertAuthorized } from "@/lib/auth-service";
import { db } from "@/lib/prisma";
import { appUrl, normalizeEmail, safeInt, slugify } from "@/lib/utils";
import { checkboxValue, formValue, formValues, type FormState } from "@/lib/forms";
import { createInviteToken, hashInviteToken, inviteExpiry } from "@/lib/invites";
import { sendEmail, escapeHtml } from "@/lib/email";
import { isRegistrationOpen } from "@/lib/challenges";
import { checkRateLimit } from "@/lib/rate-limit";
import { recordConsent } from "@/lib/consent";
import { createVerificationToken, verifyToken, consumeToken } from "@/lib/tokens";

const requiredCheck = z.boolean().refine(Boolean, "Required.");
const passwordSchema = z.string().min(8, "Use at least 8 characters.").refine((val) => Buffer.byteLength(val, "utf8") <= 72, "Password cannot exceed 72 bytes.");

// Strict HTTPS URL validator rejecting javascript:, data:, file:, ftp:, embedded credentials
const httpsUrl = z
  .string()
  .trim()
  .url("Enter a valid URL.")
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        if (parsed.protocol !== "https:") return false;
        if (parsed.username || parsed.password) return false;
        if (/[\x00-\x1F\x7F]/.test(url)) return false;
        return true;
      } catch {
        return false;
      }
    },
    "URL must start with https:// and be a valid, secure web address (javascript:, data:, file:, ftp:, and HTTP links are strictly rejected)."
  );

const optionalHttpsUrl = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || undefined)
  .pipe(httpsUrl.optional());

const studentSchema = z
  .object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    email: z.string().email("Enter a valid email address.").transform(normalizeEmail),
    password: passwordSchema,
    confirmPassword: z.string(),
    grade: z.string().min(1, "Grade is required."),
    schoolName: z.string().min(1, "School name is required."),
    city: z.string().min(1, "City is required."),
    state: z.string().min(1, "State is required."),
    country: z.string().min(1, "Country is required."),
    interests: z.array(z.string()).default([]),
    isUnder18: z.string().min(1, "Select whether you are under 18."),
    is13Plus: requiredCheck,
    parentName: z.string().optional(),
    parentEmail: z.string().optional(),
    parentSignature: z.string().optional(),
    studentSignature: z.string().min(1, "Student signature is required."),
    agree: requiredCheck
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match."
  })
  .superRefine((data, ctx) => {
    if (data.isUnder18 === "true") {
      if (!data.parentName || data.parentName.trim() === "") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["parentName"], message: "Parent/guardian full name is required." });
      }
      if (!data.parentEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.parentEmail.trim())) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["parentEmail"], message: "Enter a valid parent/guardian email address." });
      }
      if (!data.parentSignature || data.parentSignature.trim() === "") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["parentSignature"], message: "Parent/guardian electronic signature is required." });
      }
    }
  });

const studentProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  grade: z.string().min(1, "Grade is required."),
  schoolName: z.string().min(1, "School name is required."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  country: z.string().min(1, "Country is required."),
  interests: z.array(z.string()).default([]),
  isPublic: z.boolean()
});

const organizationSchema = z
  .object({
    organizationName: z.string().min(2, "Organization name is required."),
    organizationType: z.nativeEnum(OrganizationType),
    website: optionalHttpsUrl,
    contactFirstName: z.string().min(1, "First name is required."),
    contactLastName: z.string().min(1, "Last name is required."),
    contactRole: z.string().min(1, "Contact role or title is required."),
    contactEmail: z.string().email("Enter a valid work email.").transform(normalizeEmail),
    password: passwordSchema,
    confirmPassword: z.string(),
    city: z.string().min(1, "City is required."),
    state: z.string().min(1, "State is required."),
    country: z.string().min(1, "Country is required."),
    description: z.string().min(20, "Provide a description of at least 20 characters."),
    authorized: requiredCheck,
    agree: requiredCheck
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match."
  });

const loginSchema = z.object({
  email: z.string().email("Enter a valid email.").transform(normalizeEmail),
  password: z.string().min(1, "Password is required.")
});

const challengeSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  category: z.nativeEnum(ChallengeCategory),
  shortSummary: z.string().min(20, "Short summary must be at least 20 characters."),
  problemStatement: z.string().min(50, "Problem statement must be at least 50 characters."),
  background: z.string().min(20, "Background must be at least 20 characters."),
  goal: z.string().min(20, "Goal must be at least 20 characters."),
  deliverables: z.array(z.string()).min(1, "Select at least one deliverable."),
  minTeamSize: z.coerce.number().int().min(1, "Minimum team size must be at least 1."),
  maxTeamSize: z.coerce.number().int().min(1, "Maximum team size must be at least 1."),
  eligibilityNotes: z.string().optional(),
  registrationOpenAt: z.string().min(1, "Registration open date is required."),
  registrationCloseAt: z.string().min(1, "Registration close date is required."),
  submissionDeadline: z.string().min(1, "Submission deadline date is required."),
  judgingStartsAt: z.string().min(1, "Judging start date is required."),
  winnerAnnouncementAt: z.string().min(1, "Winner announcement date is required."),
  timezone: z.string().min(1, "Timezone is required."),
  prizeDescription: z.string().optional(),
  prizeCashValue: z.string().optional(),
  recognitionDescription: z.string().optional(),
  rubricJson: z.string().min(2, "Rubric definition is required."),
  isSaveDraft: z.boolean().default(false)
});

const teamSchema = z.object({
  teamName: z.string().min(2, "Team name must be at least 2 characters."),
  memberInvites: z.array(
    z.object({
      invitedName: z.string().min(1, "Name is required."),
      invitedEmail: z.string().email("Enter a valid email.").transform(normalizeEmail)
    })
  ).default([])
});

const submissionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  summary: z.string().min(20, "Summary must be at least 20 characters."),
  submissionLink: httpsUrl,
  fileUrl: optionalHttpsUrl,
  notes: z.string().optional()
});

function stateFromError(message: string, fieldErrors?: Record<string, string[]>, values?: Record<string, any>): FormState {
  return { success: undefined, message, errors: fieldErrors, values };
}

export async function studentSignupAction(_: FormState, formData: FormData): Promise<FormState> {
  const mutationCheck = assertMutationAllowed();
  if (!mutationCheck.allowed) return stateFromError(mutationCheck.message!);

  const values = studentValues(formData);
  const parsed = studentSchema.safeParse(values);
  if (!parsed.success) {
    return stateFromError("Please fix the highlighted fields.", parsed.error.flatten().fieldErrors, values);
  }

  const authCheck = await assertAuthorized({ action: "REGISTER_STUDENT", targetEmail: parsed.data.email });
  if (!authCheck.allowed) return stateFromError(authCheck.reason!);

  const rateCheck = await checkRateLimit({ action: "auth", email: parsed.data.email });
  if (!rateCheck.allowed) {
    return stateFromError(`Too many registration attempts. Please wait ${rateCheck.retryAfterSeconds} seconds.`);
  }

  const existing = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return stateFromError(
      "We could not create an account with these details.",
      { email: ["An account with this email already exists or registration cannot be completed."] },
      values
    );
  }

  const isMinor = parsed.data.isUnder18 === "true";
  const guardianStatus = isMinor ? GuardianApprovalStatus.PENDING_GUARDIAN : GuardianApprovalStatus.NOT_REQUIRED;

  const parentEmail = isMinor && parsed.data.parentEmail ? normalizeEmail(parsed.data.parentEmail) : null;

  // Create user and profile in transaction
  const user = await db.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email: parsed.data.email,
        passwordHash: await hashPassword(parsed.data.password),
        role: Role.STUDENT,
        status: AccountStatus.PENDING_EMAIL_VERIFICATION,
        studentProfile: {
          create: {
            firstName: parsed.data.firstName,
            lastName: parsed.data.lastName,
            grade: parsed.data.grade,
            schoolName: parsed.data.schoolName,
            city: parsed.data.city,
            state: parsed.data.state,
            country: parsed.data.country,
            interests: JSON.stringify(parsed.data.interests),
            guardianApprovalStatus: guardianStatus
          }
        }
      },
      include: { studentProfile: true }
    });

    if (isMinor && parentEmail && parsed.data.parentName) {
      await tx.guardianRelationship.create({
        data: {
          studentId: newUser.studentProfile!.id,
          guardianEmail: parentEmail,
          guardianName: parsed.data.parentName,
          status: GuardianApprovalStatus.PENDING_GUARDIAN
        }
      });
    }

    return newUser;
  });

  // Ensure Terms and Privacy PolicyDocument exists in DB before consent recording
  let policy = await db.policyDocument.findUnique({
    where: { key_version: { key: "TermsAndPrivacy", version: "2026.1" } }
  });

  if (!policy || policy.approvalStatus !== "APPROVED") {
    policy = await db.policyDocument.upsert({
      where: { key_version: { key: "TermsAndPrivacy", version: "2026.1" } },
      create: {
        key: "TermsAndPrivacy",
        version: "2026.1",
        contentHash: crypto.createHash("sha256").update("SolveSprint Terms of Use and Privacy Policy Version 2026.1").digest("hex"),
        contentText: "SolveSprint Terms of Use and Privacy Policy Version 2026.1",
        approvalStatus: "APPROVED"
      },
      update: { approvalStatus: "APPROVED" }
    });
  }

  await recordConsent({
    actorUserId: user.id,
    actorType: "STUDENT",
    subjectStudentId: user.studentProfile?.id,
    policyKey: "TermsAndPrivacy",
    policyVersion: "2026.1",
    statementText: `I confirm that I am at least 13 years of age, agree to the SolveSprint Terms of Use and Privacy Policy, and digitally sign as ${parsed.data.studentSignature}.`
  });

  // Generate Email Verification token
  const { rawToken: emailToken } = await createVerificationToken({
    tokenType: "EMAIL_VERIFICATION",
    recipientEmail: user.email,
    targetId: user.id,
    expiresInHours: 24
  });

  const verifyUrl = appUrl(`/verify-email/${emailToken}`);
  await sendEmail({
    to: user.email,
    subject: "Verify your email address for SolveSprint",
    text: `Hello ${parsed.data.firstName},\n\nPlease verify your SolveSprint account email by clicking this link:\n${verifyUrl}\n\nThank you,\nSolveSprint Team`,
    html: `<p>Hello ${escapeHtml(parsed.data.firstName)},</p><p>Please verify your account email by clicking the link below:</p><p><a href="${verifyUrl}">Verify Email Address</a></p>`,
    links: { VerifyLink: verifyUrl }
  });

  if (isMinor && parentEmail) {
    const guardianRelation = await db.guardianRelationship.findFirst({
      where: { studentId: user.studentProfile!.id, guardianEmail: parentEmail }
    });

    const { rawToken: guardianToken } = await createVerificationToken({
      tokenType: "GUARDIAN_APPROVAL",
      recipientEmail: parentEmail,
      targetId: guardianRelation ? guardianRelation.id : user.id,
      expiresInHours: 72
    });

    const approvalUrl = appUrl(`/guardian/approve/${guardianToken}`);
    await sendEmail({
      to: parentEmail,
      subject: `Action Required: SolveSprint Parent/Guardian Approval for ${parsed.data.firstName} ${parsed.data.lastName}`,
      text: `Hello ${parsed.data.parentName || "Parent/Guardian"},\n\nYour child ${parsed.data.firstName} ${parsed.data.lastName} registered for SolveSprint.\n\nPlease review terms and approve participation here:\n${approvalUrl}`,
      html: `<p>Hello ${escapeHtml(parsed.data.parentName || "Parent/Guardian")},</p><p>Please review and confirm guardian consent:</p><p><a href="${approvalUrl}">Review & Approve Participation</a></p>`,
      links: { ApprovalLink: approvalUrl }
    });
  }

  redirect("/login?verify_email=1");
}

export async function organizationSignupAction(_: FormState, formData: FormData): Promise<FormState> {
  const values = {
    organizationName: formValue(formData, "organizationName"),
    organizationType: formValue(formData, "organizationType"),
    website: formValue(formData, "website"),
    contactFirstName: formValue(formData, "contactFirstName"),
    contactLastName: formValue(formData, "contactLastName"),
    contactRole: formValue(formData, "contactRole"),
    contactEmail: formValue(formData, "contactEmail"),
    password: formValue(formData, "password"),
    confirmPassword: formValue(formData, "confirmPassword"),
    city: formValue(formData, "city"),
    state: formValue(formData, "state"),
    country: formValue(formData, "country"),
    description: formValue(formData, "description"),
    authorized: checkboxValue(formData, "authorized"),
    agree: checkboxValue(formData, "agree")
  };

  const parsed = organizationSchema.safeParse(values);
  if (!parsed.success) {
    return stateFromError("Please fix the highlighted fields.", parsed.error.flatten().fieldErrors, values);
  }

  const authCheck = await assertAuthorized({ action: "REGISTER_ORG", targetEmail: parsed.data.contactEmail });
  if (!authCheck.allowed) return stateFromError(authCheck.reason!);

  const rateCheck = await checkRateLimit({ action: "auth", email: parsed.data.contactEmail });
  if (!rateCheck.allowed) {
    return stateFromError(`Too many registration attempts. Please wait ${rateCheck.retryAfterSeconds} seconds.`);
  }

  const existing = await db.user.findUnique({ where: { email: parsed.data.contactEmail } });
  if (existing) {
    return stateFromError(
      "We could not create an account with these details.",
      { contactEmail: ["An account with this work email already exists."] },
      values
    );
  }

  const user = await db.user.create({
    data: {
      email: parsed.data.contactEmail,
      passwordHash: await hashPassword(parsed.data.password),
      role: Role.ORGANIZATION,
      status: AccountStatus.PENDING_EMAIL_VERIFICATION,
      organizationProfile: {
        create: {
          organizationName: parsed.data.organizationName,
          organizationType: parsed.data.organizationType,
          website: parsed.data.website || null,
          contactFirstName: parsed.data.contactFirstName,
          contactLastName: parsed.data.contactLastName,
          contactRole: parsed.data.contactRole || null,
          city: parsed.data.city,
          state: parsed.data.state,
          country: parsed.data.country,
          description: parsed.data.description,
          verificationStatus: OrganizationVerificationStatus.UNVERIFIED
        }
      }
    }
  });

  let policy = await db.policyDocument.findUnique({
    where: { key_version: { key: "HostAgreement", version: "2026.1" } }
  });

  if (!policy || policy.approvalStatus !== "APPROVED") {
    policy = await db.policyDocument.upsert({
      where: { key_version: { key: "HostAgreement", version: "2026.1" } },
      create: {
        key: "HostAgreement",
        version: "2026.1",
        contentHash: crypto.createHash("sha256").update("SolveSprint Host Organization Agreement Version 2026.1").digest("hex"),
        contentText: "SolveSprint Host Organization Agreement Version 2026.1",
        approvalStatus: "APPROVED"
      },
      update: { approvalStatus: "APPROVED" }
    });
  }

  await recordConsent({
    actorUserId: user.id,
    actorType: "ORGANIZATION",
    policyKey: "HostAgreement",
    policyVersion: "2026.1",
    statementText: "I confirm I am an authorized representative of this organization."
  });

  const { rawToken: emailToken } = await createVerificationToken({
    tokenType: "EMAIL_VERIFICATION",
    recipientEmail: user.email,
    targetId: user.id,
    expiresInHours: 24
  });

  const verifyUrl = appUrl(`/verify-email/${emailToken}`);
  await sendEmail({
    to: user.email,
    subject: "Verify your work email address for SolveSprint Host Organization Account",
    text: `Hello ${parsed.data.contactFirstName},\n\nPlease verify your organization account email by clicking this link:\n${verifyUrl}\n\nThank you,\nSolveSprint Team`,
    html: `<p>Hello ${escapeHtml(parsed.data.contactFirstName)},</p><p>Please verify your work email address:</p><p><a href="${verifyUrl}">Verify Email Address</a></p>`,
    links: { VerifyLink: verifyUrl }
  });

  redirect("/login?verify_email=1");
}

export async function verifyEmailAction(rawToken: string): Promise<FormState> {
  const authCheck = await assertAuthorized({ action: "VERIFY_EMAIL" });
  if (!authCheck.allowed) return stateFromError(authCheck.reason!);

  const { valid, record, reason } = await verifyToken(rawToken, "EMAIL_VERIFICATION");
  if (!valid || !record || !record.targetId) {
    return stateFromError(reason || "Invalid or expired email verification token.");
  }

  const user = await db.user.findUnique({
    where: { id: record.targetId },
    include: { studentProfile: true, organizationProfile: true }
  });

  if (!user) return stateFromError("User record not found.");

  const isMinorStudent = user.studentProfile?.guardianApprovalStatus === GuardianApprovalStatus.PENDING_GUARDIAN;
  const newStatus = isMinorStudent ? AccountStatus.ACTIVE : AccountStatus.ACTIVE;

  await db.$transaction([
    db.user.update({
      where: { id: user.id },
      data: { status: newStatus }
    }),
    db.verificationToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() }
    })
  ]);

  await createSession(user);

  if (user.role === Role.ADMIN) redirect("/admin");
  if (user.role === Role.ORGANIZATION) redirect("/org/dashboard?welcome=1");
  redirect("/student/my-challenges?welcome=1");
}

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  const values = {
    email: formValue(formData, "email"),
    password: formValue(formData, "password")
  };

  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return stateFromError("Please fix the highlighted fields.", parsed.error.flatten().fieldErrors, values);
  }

  const rateCheck = await checkRateLimit({ action: "auth", email: parsed.data.email });
  if (!rateCheck.allowed) {
    return stateFromError(`Too many login attempts. Please wait ${rateCheck.retryAfterSeconds} seconds.`);
  }

  const user = await db.user.findUnique({
    where: { email: parsed.data.email },
    include: { studentProfile: true, organizationProfile: true, judgeProfile: true }
  });

  if (!user) {
    return stateFromError("Invalid email or password.", { email: ["Invalid email or password."] }, values);
  }

  const authCheck = await assertAuthorized({ action: "LOGIN", user });
  if (!authCheck.allowed) return stateFromError(authCheck.reason!);

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) {
    return stateFromError("Invalid email or password.", { email: ["Invalid email or password."] }, values);
  }

  if (user.status === UserStatus.SUSPENDED || user.status === UserStatus.DEACTIVATED) {
    return stateFromError("This account has been suspended or deactivated. Contact support for assistance.");
  }

  if (user.status === AccountStatus.PENDING_EMAIL_VERIFICATION) {
    return stateFromError("Please verify your email address before logging in. Check your inbox for a verification link.");
  }

  await createSession(user);

  const rawNext = formValue(formData, "next");
  const sanitizedNext = sanitizeRedirectUrl(rawNext, "/");
  if (rawNext && sanitizedNext !== "/") {
    redirect(sanitizedNext);
  }

  if (user.role === Role.ADMIN) redirect("/admin");
  if (user.role === Role.ORGANIZATION) redirect("/org/dashboard");
  redirect("/student/my-challenges");
}

export async function createChallengeAction(_: FormState, formData: FormData): Promise<FormState> {
  const { organization, user } = await requireOrganization();
  const authCheck = await assertAuthorized({ action: "CREATE_CHALLENGE", user });
  if (!authCheck.allowed) return stateFromError(authCheck.reason!);

  const rawRubric = formValue(formData, "rubricJson");
  const parsedRubric = rawRubric || JSON.stringify(rubricDefaults);

  const values = {
    title: formValue(formData, "title"),
    category: formValue(formData, "category"),
    shortSummary: formValue(formData, "shortSummary"),
    problemStatement: formValue(formData, "problemStatement"),
    background: formValue(formData, "background"),
    goal: formValue(formData, "goal"),
    deliverables: formValues(formData, "deliverables").filter((item) => deliverables.includes(item)),
    minTeamSize: formValue(formData, "minTeamSize"),
    maxTeamSize: formValue(formData, "maxTeamSize"),
    eligibilityNotes: formValue(formData, "eligibilityNotes"),
    registrationOpenAt: formValue(formData, "registrationOpenAt"),
    registrationCloseAt: formValue(formData, "registrationCloseAt"),
    submissionDeadline: formValue(formData, "submissionDeadline"),
    judgingStartsAt: formValue(formData, "judgingStartsAt"),
    winnerAnnouncementAt: formValue(formData, "winnerAnnouncementAt"),
    timezone: formValue(formData, "timezone") || "America/New_York",
    prizeDescription: formValue(formData, "prizeDescription"),
    prizeCashValue: formValue(formData, "prizeCashValue"),
    recognitionDescription: formValue(formData, "recognitionDescription"),
    rubricJson: parsedRubric,
    isSaveDraft: formValue(formData, "action") === "draft"
  };

  const parsed = challengeSchema.safeParse(values);
  if (!parsed.success) {
    return stateFromError("Please fix the highlighted fields.", parsed.error.flatten().fieldErrors, values);
  }

  const baseSlug = slugify(parsed.data.title);
  let slug = baseSlug;
  let counter = 1;
  while (await db.challenge.findUnique({ where: { slug } })) {
    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }

  const initialStatus = parsed.data.isSaveDraft ? ChallengeStatus.DRAFT : ChallengeStatus.SUBMITTED_FOR_REVIEW;

  const challenge = await db.challenge.create({
    data: {
      organizationId: organization.id,
      title: parsed.data.title,
      slug,
      category: parsed.data.category,
      shortSummary: parsed.data.shortSummary,
      problemStatement: parsed.data.problemStatement,
      background: parsed.data.background,
      goal: parsed.data.goal,
      deliverables: JSON.stringify(parsed.data.deliverables),
      minTeamSize: parsed.data.minTeamSize,
      maxTeamSize: parsed.data.maxTeamSize,
      eligibilityNotes: parsed.data.eligibilityNotes,
      registrationOpenAt: new Date(parsed.data.registrationOpenAt),
      registrationCloseAt: new Date(parsed.data.registrationCloseAt),
      submissionDeadline: new Date(parsed.data.submissionDeadline),
      judgingStartsAt: new Date(parsed.data.judgingStartsAt),
      winnerAnnouncementAt: new Date(parsed.data.winnerAnnouncementAt),
      timezone: parsed.data.timezone,
      prizeDescription: parsed.data.prizeDescription,
      prizeCashValueCents: parsed.data.prizeCashValue ? Math.round(Number(parsed.data.prizeCashValue) * 100) : null,
      recognitionDescription: parsed.data.recognitionDescription,
      rubricJson: parsed.data.rubricJson,
      status: initialStatus
    }
  });

  revalidatePath("/org/dashboard");
  redirect(`/org/challenges/${challenge.id}?created=1`);
}

export async function createTeamAction(_: FormState, formData: FormData): Promise<FormState> {
  const { student, user } = await requireStudent();
  const authCheck = await assertAuthorized({ action: "CREATE_TEAM", user });
  if (!authCheck.allowed) return stateFromError(authCheck.reason!);

  const challengeId = formValue(formData, "challengeId");
  const challenge = await db.challenge.findUnique({ where: { id: challengeId } });

  if (!challenge || !isRegistrationOpen(challenge)) {
    return stateFromError("Registration for this challenge is currently closed.");
  }

  const existingMembership = await db.teamMember.findFirst({
    where: {
      studentId: student.id,
      status: TeamMemberStatus.ACCEPTED,
      team: { challengeId }
    }
  });

  if (existingMembership) {
    return stateFromError("You are already a registered member of a team in this challenge.");
  }

  const inviteNames = formValues(formData, "invitedName");
  const inviteEmails = formValues(formData, "invitedEmail");
  const memberInvites = inviteNames.map((name, idx) => ({
    invitedName: name,
    invitedEmail: inviteEmails[idx] ? normalizeEmail(inviteEmails[idx]) : ""
  })).filter((invite) => invite.invitedName && invite.invitedEmail);

  // Check total team size against maxTeamSize limit
  if (1 + memberInvites.length > challenge.maxTeamSize) {
    return stateFromError(`Team size cannot exceed ${challenge.maxTeamSize} members for this challenge.`);
  }

  const values = {
    teamName: formValue(formData, "teamName"),
    memberInvites
  };

  const parsed = teamSchema.safeParse(values);
  if (!parsed.success) {
    return stateFromError("Please fix the highlighted fields.", parsed.error.flatten().fieldErrors, values);
  }

  const pendingEmailInvitesToDispatch: { to: string; name: string; token: string; teamName: string; challengeTitle: string }[] = [];

  // Transactionally create team, enrollment (with teamId), and pending member invites
  const team = await db.$transaction(async (tx) => {
    const createdTeam = await tx.team.create({
      data: {
        challengeId,
        teamName: parsed.data.teamName,
        leadStudentId: student.id,
        status: TeamStatus.REGISTERED,
        members: {
          create: [
            {
              studentId: student.id,
              invitedName: `${student.firstName} ${student.lastName}`,
              invitedEmail: user.email,
              role: TeamRole.LEAD,
              status: TeamMemberStatus.ACCEPTED,
              respondedAt: new Date()
            }
          ]
        }
      }
    });

    await tx.challengeEnrollment.create({
      data: {
        challengeId,
        studentId: student.id,
        teamId: createdTeam.id,
        status: "ACTIVE"
      }
    });

    for (const invite of parsed.data.memberInvites) {
      const { token, tokenHash } = createInviteToken();
      await tx.teamMember.create({
        data: {
          teamId: createdTeam.id,
          invitedName: invite.invitedName,
          invitedEmail: invite.invitedEmail,
          role: TeamRole.MEMBER,
          status: TeamMemberStatus.PENDING,
          inviteTokenHash: tokenHash,
          inviteTokenExpiresAt: inviteExpiry(challenge.registrationCloseAt)
        }
      });
      pendingEmailInvitesToDispatch.push({
        to: invite.invitedEmail,
        name: invite.invitedName,
        token,
        teamName: createdTeam.teamName,
        challengeTitle: challenge.title
      });
    }

    return createdTeam;
  });

  // Dispatch external emails OUTSIDE database transaction
  for (const item of pendingEmailInvitesToDispatch) {
    const inviteUrl = appUrl(`/invite/${item.token}`);
    await sendEmail({
      to: item.to,
      subject: `Team Invitation: Join ${item.teamName} on SolveSprint`,
      text: `Hi ${item.name},\n\n${student.firstName} ${student.lastName} invited you to join team "${item.teamName}" for challenge "${item.challengeTitle}".\n\nAccept invite:\n${inviteUrl}`,
      html: `<p>Hi ${escapeHtml(item.name)},</p><p>You are invited to join <strong>"${escapeHtml(item.teamName)}"</strong>.</p><p><a href="${inviteUrl}">Accept Invitation</a></p>`,
      links: { AcceptInvite: inviteUrl }
    });
  }

  revalidatePath(`/challenges/${challenge.slug}`);
  redirect(`/student/my-challenges?registered=${team.id}`);
}

export async function submitSolutionAction(_: FormState, formData: FormData): Promise<FormState> {
  const { student, user } = await requireStudent();
  const authCheck = await assertAuthorized({ action: "SUBMIT_SOLUTION", user });
  if (!authCheck.allowed) return stateFromError(authCheck.reason!);

  const challengeId = formValue(formData, "challengeId");
  const challenge = await db.challenge.findUnique({ where: { id: challengeId } });

  if (!challenge) return stateFromError("Challenge not found.");

  if (new Date() > challenge.submissionDeadline) {
    return stateFromError("The submission deadline for this challenge has passed.");
  }

  const team = await db.team.findFirst({
    where: { challengeId, leadStudentId: student.id },
    include: {
      members: { where: { status: TeamMemberStatus.ACCEPTED } },
      submission: true
    }
  });

  if (!team) return stateFromError("Only the registered team lead can submit solutions.");

  if (team.members.length < challenge.minTeamSize) {
    return stateFromError(`Your team has ${team.members.length} accepted member(s), but this challenge requires at least ${challenge.minTeamSize} accepted member(s) to submit.`);
  }

  const values = {
    title: formValue(formData, "title"),
    summary: formValue(formData, "summary"),
    submissionLink: formValue(formData, "submissionLink"),
    fileUrl: formValue(formData, "fileUrl"),
    notes: formValue(formData, "notes")
  };

  const parsed = submissionSchema.safeParse(values);
  if (!parsed.success) {
    return stateFromError("Please fix the highlighted fields.", parsed.error.flatten().fieldErrors, values);
  }

  const receiptSecret = process.env.RECEIPT_HMAC_SECRET || process.env.AUTH_SECRET;
  if (!receiptSecret) {
    throw new Error("RECEIPT_HMAC_SECRET environment variable is missing.");
  }

  await db.$transaction(async (tx) => {
    const existing = await tx.submission.findUnique({ where: { teamId: team.id } });
    let submissionId = existing?.id;

    if (existing) {
      await tx.submission.update({
        where: { id: existing.id },
        data: {
          title: parsed.data.title,
          summary: parsed.data.summary,
          submissionLink: parsed.data.submissionLink,
          fileUrl: parsed.data.fileUrl,
          notes: parsed.data.notes,
          status: "SUBMITTED"
        }
      });
    } else {
      const created = await tx.submission.create({
        data: {
          teamId: team.id,
          challengeId,
          title: parsed.data.title,
          summary: parsed.data.summary,
          submissionLink: parsed.data.submissionLink,
          fileUrl: parsed.data.fileUrl,
          notes: parsed.data.notes,
          status: "SUBMITTED"
        }
      });
      submissionId = created.id;
    }

    const rulesJson = JSON.stringify({ defaultRules: true, requiredSubmissionFields: ["title", "summary", "submissionLink"] });
    const contentHash = crypto.createHash("sha256").update(rulesJson).digest("hex");

    const ruleVersion = await tx.challengeRuleVersion.findFirst({
      where: { challengeId },
      orderBy: { versionNumber: "desc" }
    }) || await tx.challengeRuleVersion.create({
      data: {
        challengeId,
        versionNumber: 1,
        contentHash,
        rulesJson
      }
    });

    let origPolicy = await tx.policyDocument.findUnique({
      where: { key_version: { key: "OriginalityPolicy", version: "2026.1" } }
    });

    if (!origPolicy || origPolicy.approvalStatus !== "APPROVED") {
      origPolicy = await tx.policyDocument.upsert({
        where: { key_version: { key: "OriginalityPolicy", version: "2026.1" } },
        create: {
          key: "OriginalityPolicy",
          version: "2026.1",
          contentHash: crypto.createHash("sha256").update("SolveSprint Solution Originality Policy Version 2026.1").digest("hex"),
          contentText: "SolveSprint Solution Originality Policy Version 2026.1",
          approvalStatus: "APPROVED"
        },
        update: { approvalStatus: "APPROVED" }
      });
    }

    const revisionCount = await tx.submissionRevision.count({ where: { submissionId } });
    const nextRevisionNumber = revisionCount + 1;

    const receiptPayload = `${submissionId}:${nextRevisionNumber}:${parsed.data.title}:${parsed.data.submissionLink}:${Date.now()}`;
    const receiptHmac = crypto.createHmac("sha256", receiptSecret).update(receiptPayload).digest("hex");

    await tx.submissionRevision.create({
      data: {
        submissionId: submissionId!,
        receiptHmac,
        revisionNumber: nextRevisionNumber,
        title: parsed.data.title,
        summary: parsed.data.summary,
        submissionLink: parsed.data.submissionLink,
        fileUrl: parsed.data.fileUrl,
        notes: parsed.data.notes,
        challengeRuleVersionId: ruleVersion.id,
        originalityPolicyId: origPolicy.id,
        submittedById: student.userId
      }
    });
  });

  revalidatePath(`/challenges/${challenge.slug}/submit`);
  redirect(`/challenges/${challenge.slug}/submit?submitted=1`);
}

export async function adminVerifyOrganizationAction(_: FormState, formData: FormData): Promise<FormState> {
  const adminUser = await requireAdmin();
  const authCheck = await assertAuthorized({ action: "ADMIN_VERIFY_ORG", user: adminUser, isMfaVerified: true });
  if (!authCheck.allowed) return stateFromError(authCheck.reason!);

  const orgId = formValue(formData, "organizationId");
  const actionType = formValue(formData, "actionType");

  const org = await db.organizationProfile.findUnique({ where: { id: orgId }, include: { user: true } });
  if (!org) return stateFromError("Organization profile not found.");

  const newStatus = actionType === "approve" ? OrganizationStatus.VERIFIED : OrganizationStatus.SUSPENDED;

  await db.$transaction([
    db.organizationProfile.update({
      where: { id: orgId },
      data: { verificationStatus: newStatus }
    }),
    db.user.update({
      where: { id: org.userId },
      data: { status: newStatus === OrganizationStatus.VERIFIED ? UserStatus.ACTIVE : UserStatus.SUSPENDED }
    })
  ]);

  revalidatePath("/admin");
  return { success: "1", message: `Organization ${actionType === "approve" ? "approved & activated" : "rejected"} successfully.` };
}

export async function publishResultsAction(_: FormState, formData: FormData): Promise<FormState> {
  const adminUser = await requireAdmin();
  const authCheck = await assertAuthorized({ action: "PUBLISH_AWARDS", user: adminUser, isMfaVerified: true });
  if (!authCheck.allowed) return stateFromError(authCheck.reason!);

  const challengeId = formValue(formData, "challengeId");
  const challenge = await db.challenge.findUnique({ where: { id: challengeId } });
  if (!challenge) return stateFromError("Challenge not found.");

  const now = new Date();
  if (now < challenge.winnerAnnouncementAt) {
    return stateFromError(`Results publication date has not arrived yet (Scheduled for ${challenge.winnerAnnouncementAt.toISOString()}).`);
  }

  // Create immutable result snapshot
  const awards = await db.award.findMany({ where: { challengeId } });
  const snapshotJson = JSON.stringify({ challengeId, publishedAt: now.toISOString(), awards });
  const snapshotHash = crypto.createHash("sha256").update(snapshotJson).digest("hex");

  await db.$transaction([
    db.awardResultSnapshot.create({
      data: {
        challengeId,
        snapshotHash,
        snapshotJson,
        publishedById: adminUser.id
      }
    }),
    db.award.updateMany({
      where: { challengeId },
      data: { status: AwardStatus.PUBLISHED, publishedAt: now, publishedBy: adminUser.id }
    }),
    db.challenge.update({
      where: { id: challengeId },
      data: { status: ChallengeStatus.RESULTS_PUBLISHED }
    })
  ]);

  revalidatePath(`/challenges/${challenge.slug}`);
  revalidatePath("/leaderboard");
  return { success: "1", message: "Challenge award results published successfully." };
}

export async function updateStudentProfileAction(_: FormState, formData: FormData): Promise<FormState> {
  const { student } = await requireStudent();
  const values = {
    firstName: formValue(formData, "firstName"),
    lastName: formValue(formData, "lastName"),
    grade: formValue(formData, "grade"),
    schoolName: formValue(formData, "schoolName"),
    city: formValue(formData, "city"),
    state: formValue(formData, "state"),
    country: formValue(formData, "country"),
    interests: formValues(formData, "interests").filter((i) => interests.includes(i)),
    isPublic: checkboxValue(formData, "isPublic")
  };

  const parsed = studentProfileSchema.safeParse(values);
  if (!parsed.success) {
    return stateFromError("Please fix the highlighted fields.", parsed.error.flatten().fieldErrors, values);
  }

  await db.studentProfile.update({
    where: { id: student.id },
    data: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      grade: parsed.data.grade,
      schoolName: parsed.data.schoolName,
      city: parsed.data.city,
      state: parsed.data.state,
      country: parsed.data.country,
      interests: JSON.stringify(parsed.data.interests)
    }
  });

  revalidatePath("/student/profile");
  return { success: "1", message: "Profile updated successfully." };
}

export async function updateChallengeAction(_: FormState, formData: FormData): Promise<FormState> {
  const { organization } = await requireOrganization();
  const challengeId = formValue(formData, "challengeId");

  const challenge = await db.challenge.findUnique({ where: { id: challengeId } });
  if (!challenge || challenge.organizationId !== organization.id) {
    return stateFromError("Challenge not found or access denied.");
  }

  const rawRubric = formValue(formData, "rubricJson");
  const values = {
    title: formValue(formData, "title"),
    category: formValue(formData, "category"),
    shortSummary: formValue(formData, "shortSummary"),
    problemStatement: formValue(formData, "problemStatement"),
    background: formValue(formData, "background"),
    goal: formValue(formData, "goal"),
    deliverables: formValues(formData, "deliverables").filter((item) => deliverables.includes(item)),
    minTeamSize: formValue(formData, "minTeamSize"),
    maxTeamSize: formValue(formData, "maxTeamSize"),
    eligibilityNotes: formValue(formData, "eligibilityNotes"),
    registrationOpenAt: formValue(formData, "registrationOpenAt"),
    registrationCloseAt: formValue(formData, "registrationCloseAt"),
    submissionDeadline: formValue(formData, "submissionDeadline"),
    judgingStartsAt: formValue(formData, "judgingStartsAt"),
    winnerAnnouncementAt: formValue(formData, "winnerAnnouncementAt"),
    timezone: formValue(formData, "timezone") || "America/New_York",
    prizeDescription: formValue(formData, "prizeDescription"),
    prizeCashValue: formValue(formData, "prizeCashValue"),
    recognitionDescription: formValue(formData, "recognitionDescription"),
    rubricJson: rawRubric || challenge.rubricJson,
    isSaveDraft: formValue(formData, "action") === "draft"
  };

  const parsed = challengeSchema.safeParse(values);
  if (!parsed.success) {
    return stateFromError("Please fix the highlighted fields.", parsed.error.flatten().fieldErrors, values);
  }

  await db.challenge.update({
    where: { id: challengeId },
    data: {
      title: parsed.data.title,
      category: parsed.data.category,
      shortSummary: parsed.data.shortSummary,
      problemStatement: parsed.data.problemStatement,
      background: parsed.data.background,
      goal: parsed.data.goal,
      deliverables: JSON.stringify(parsed.data.deliverables),
      minTeamSize: parsed.data.minTeamSize,
      maxTeamSize: parsed.data.maxTeamSize,
      eligibilityNotes: parsed.data.eligibilityNotes,
      registrationOpenAt: new Date(parsed.data.registrationOpenAt),
      registrationCloseAt: new Date(parsed.data.registrationCloseAt),
      submissionDeadline: new Date(parsed.data.submissionDeadline),
      judgingStartsAt: new Date(parsed.data.judgingStartsAt),
      winnerAnnouncementAt: new Date(parsed.data.winnerAnnouncementAt),
      timezone: parsed.data.timezone,
      prizeDescription: parsed.data.prizeDescription,
      prizeCashValueCents: parsed.data.prizeCashValue ? Math.round(Number(parsed.data.prizeCashValue) * 100) : null,
      recognitionDescription: parsed.data.recognitionDescription,
      rubricJson: parsed.data.rubricJson,
      status: parsed.data.isSaveDraft ? ChallengeStatus.DRAFT : ChallengeStatus.SUBMITTED_FOR_REVIEW
    }
  });

  revalidatePath("/org/dashboard");
  redirect(`/org/challenges/${challengeId}?updated=1`);
}

export async function inviteStudentSignupAction(_: FormState, formData: FormData): Promise<FormState> {
  const token = formValue(formData, "token");
  const tokenHash = hashInviteToken(token);
  const invite = await db.teamMember.findUnique({ where: { inviteTokenHash: tokenHash } });

  if (!invite) return stateFromError("Invalid invitation token.");

  return studentSignupAction(_, formData);
}

export async function acceptInviteAction(_: FormState, formData: FormData): Promise<FormState> {
  const { student, user } = await requireStudent();
  const authCheck = await assertAuthorized({ action: "JOIN_TEAM", user });
  if (!authCheck.allowed) return stateFromError(authCheck.reason!);

  const token = formValue(formData, "token");
  const tokenHash = hashInviteToken(token);

  const invite = await db.teamMember.findUnique({
    where: { inviteTokenHash: tokenHash },
    include: { team: { include: { challenge: true, members: { where: { status: TeamMemberStatus.ACCEPTED } } } } }
  });

  if (!invite || invite.status !== TeamMemberStatus.PENDING) {
    return stateFromError("Invitation is invalid or has already been used.");
  }

  if (invite.inviteTokenExpiresAt && new Date() > invite.inviteTokenExpiresAt) {
    return stateFromError("This invitation link has expired.");
  }

  if (!isRegistrationOpen(invite.team.challenge)) {
    return stateFromError("Registration for this challenge has closed.");
  }

  if (invite.invitedEmail.toLowerCase() !== user.email.toLowerCase()) {
    return stateFromError(`This invitation was sent to ${invite.invitedEmail}. Please log in with that account.`);
  }

  if (invite.team.members.length >= invite.team.challenge.maxTeamSize) {
    return stateFromError(`This team has reached its maximum size of ${invite.team.challenge.maxTeamSize} members.`);
  }

  try {
    await db.$transaction(async (tx) => {
      await tx.challengeEnrollment.create({
        data: {
          challengeId: invite.team.challengeId,
          studentId: student.id,
          teamId: invite.teamId,
          status: "ACTIVE"
        }
      });
      await tx.teamMember.update({
        where: { id: invite.id },
        data: {
          studentId: student.id,
          status: TeamMemberStatus.ACCEPTED,
          respondedAt: new Date()
        }
      });
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return stateFromError("You are already enrolled or registered on a team for this challenge.");
    }
    throw error;
  }

  revalidatePath("/student/my-challenges");
  redirect(`/student/my-challenges?accepted=${invite.teamId}`);
}

export async function declineInviteAction(_: FormState, formData: FormData): Promise<FormState> {
  const { user } = await requireStudent();
  const token = formValue(formData, "token");
  const tokenHash = hashInviteToken(token);

  const invite = await db.teamMember.findUnique({ where: { inviteTokenHash: tokenHash } });
  if (!invite || invite.status !== TeamMemberStatus.PENDING) {
    return stateFromError("Invitation is invalid or expired.");
  }

  if (invite.invitedEmail.toLowerCase() !== user.email.toLowerCase()) {
    return stateFromError("Access denied.");
  }

  await db.teamMember.update({
    where: { id: invite.id },
    data: { status: TeamMemberStatus.DECLINED, respondedAt: new Date() }
  });

  revalidatePath("/student/my-challenges");
  redirect("/student/my-challenges?declined=1");
}

export async function withdrawGuardianConsentAction(_: FormState, formData: FormData): Promise<FormState> {
  const guardianRelationId = formValue(formData, "guardianRelationId");
  const relation = await db.guardianRelationship.findUnique({
    where: { id: guardianRelationId },
    include: { student: true }
  });

  if (!relation) return stateFromError("Guardian relationship record not found.");

  await db.$transaction([
    db.guardianRelationship.update({
      where: { id: guardianRelationId },
      data: { status: GuardianApprovalStatus.REVOKED, withdrawnAt: new Date() }
    }),
    db.studentProfile.update({
      where: { id: relation.studentId },
      data: { guardianApprovalStatus: GuardianApprovalStatus.REVOKED }
    }),
    db.consentRecord.updateMany({
      where: { guardianRelationId, status: "ACTIVE" },
      data: { status: "WITHDRAWN", withdrawnAt: new Date() }
    })
  ]);

  return { success: "1", message: "Guardian approval has been successfully withdrawn. Minor participation is now restricted." };
}

export async function adminChallengeAction(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const challengeId = formValue(formData, "challengeId");
  const nextStatus = formValue(formData, "nextStatus") as ChallengeStatusValue;
  const adminReviewNotes = formValue(formData, "adminReviewNotes");

  const challenge = await db.challenge.findUnique({ where: { id: challengeId } });
  if (!challenge) return stateFromError("Challenge not found.");

  const transitionAllowed: Record<string, string[]> = {
    [ChallengeStatus.DRAFT]: [ChallengeStatus.SUBMITTED_FOR_REVIEW],
    [ChallengeStatus.SUBMITTED_FOR_REVIEW]: [ChallengeStatus.APPROVED, ChallengeStatus.REQUESTED_EDITS, ChallengeStatus.REJECTED],
    [ChallengeStatus.REQUESTED_EDITS]: [ChallengeStatus.SUBMITTED_FOR_REVIEW],
    [ChallengeStatus.APPROVED]: [ChallengeStatus.SCHEDULED, ChallengeStatus.ACTIVE],
    [ChallengeStatus.SCHEDULED]: [ChallengeStatus.ACTIVE],
    [ChallengeStatus.ACTIVE]: [ChallengeStatus.SUBMISSIONS_CLOSED, ChallengeStatus.JUDGING],
    [ChallengeStatus.SUBMISSIONS_CLOSED]: [ChallengeStatus.JUDGING],
    [ChallengeStatus.JUDGING]: [ChallengeStatus.RESULTS_READY, ChallengeStatus.RESULTS_PUBLISHED],
    [ChallengeStatus.RESULTS_READY]: [ChallengeStatus.RESULTS_PUBLISHED],
    [ChallengeStatus.RESULTS_PUBLISHED]: [ChallengeStatus.COMPLETED]
  };

  const allowed = transitionAllowed[challenge.status] || [];
  if (!allowed.includes(nextStatus)) {
    return stateFromError(`Invalid status transition from ${challenge.status} to ${nextStatus}.`, { invalidTransition: ["1"] });
  }

  await db.challenge.update({
    where: { id: challengeId },
    data: {
      status: nextStatus,
      adminReviewNotes: adminReviewNotes || challenge.adminReviewNotes
    }
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/challenges/${challengeId}`);
  return { success: "1", message: `Challenge status updated to ${nextStatus}.` };
}

export async function addAwardAction(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const challengeId = formValue(formData, "challengeId");
  const teamId = formValue(formData, "teamId");
  const awardType = formValue(formData, "awardType") as AwardTypeValue;
  const points = safeInt(formValue(formData, "points")) || 100;
  const judgeComment = formValue(formData, "judgeComment");

  const challenge = await db.challenge.findUnique({
    where: { id: challengeId }
  });

  if (!challenge) return stateFromError("Challenge not found.");

  if (new Date() < challenge.submissionDeadline) {
    return stateFromError("Awards can only be created after the submission deadline has passed.", {
      submissionDeadline: ["Deadline not reached."]
    });
  }

  const submission = await db.submission.findUnique({ where: { teamId } });
  if (!submission) {
    return stateFromError("Awards can only be given to teams with a completed submission.", {
      submission: ["No submission."]
    });
  }

  try {
    await db.award.create({
      data: {
        challengeId,
        teamId,
        awardType,
        points,
        judgeComment: judgeComment || null,
        status: AwardStatus.DRAFT
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return stateFromError("This team already has an award of this type for this challenge.");
    }
    throw error;
  }

  revalidatePath(`/admin/challenges/${challengeId}`);
  return { success: "1", message: "Draft award created successfully." };
}

function studentValues(formData: FormData) {
  return {
    firstName: formValue(formData, "firstName"),
    lastName: formValue(formData, "lastName"),
    email: formValue(formData, "email"),
    password: formValue(formData, "password"),
    confirmPassword: formValue(formData, "confirmPassword"),
    grade: formValue(formData, "grade"),
    schoolName: formValue(formData, "schoolName"),
    city: formValue(formData, "city"),
    state: formValue(formData, "state"),
    country: formValue(formData, "country"),
    interests: formValues(formData, "interests").filter((interest) => interests.includes(interest)),
    isUnder18: formValue(formData, "isUnder18"),
    is13Plus: checkboxValue(formData, "is13Plus"),
    parentName: formValue(formData, "parentName"),
    parentEmail: formValue(formData, "parentEmail"),
    parentSignature: formValue(formData, "parentSignature"),
    studentSignature: formValue(formData, "studentSignature"),
    agree: checkboxValue(formData, "agree")
  };
}
