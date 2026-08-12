"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode
} from "react";
import { useFormState } from "react-dom";
import {
  AuthField,
  AuthSelect,
  AuthSubmitButton,
  PasswordField
} from "@/components/auth/auth-form-controls";
import { interests } from "@/lib/constants";
import { studentSignupAction } from "@/lib/actions";
import { emptyState, firstError } from "@/lib/forms";

type Values = Record<string, unknown>;
type Step = 1 | 2 | 3 | 4;
type ClientErrors = Record<string, string>;

type Review = {
  name: string;
  email: string;
  school: string;
  grade: string;
  interests: string[];
  isUnder18: string;
  is13Plus: boolean;
  parentName: string;
  parentEmail: string;
  parentSignature: string;
  studentSignature: string;
};

const steps = [
  { number: "01", label: "Account" },
  { number: "02", label: "Student profile" },
  { number: "03", label: "Verification" },
  { number: "04", label: "Confirm" }
] as const;

const emptyReview: Review = {
  name: "",
  email: "",
  school: "",
  grade: "",
  interests: [],
  isUnder18: "",
  is13Plus: false,
  parentName: "",
  parentEmail: "",
  parentSignature: "",
  studentSignature: ""
};

export function StudentSignupForm({ lockedEmail, token }: { lockedEmail?: string; token?: string }) {
  const [state, formAction] = useFormState(studentSignupAction, emptyState);
  const [step, setStep] = useState<Step>(1);
  const [furthestStep, setFurthestStep] = useState<Step>(1);
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});
  const [review, setReview] = useState<Review>(emptyReview);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUnder18, setIsUnder18] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const values = state.values as Values | undefined;
  const selectedInterests = (values?.interests as string[]) || [];

  useEffect(() => {
    const serverErrors = state.errors;
    if (!serverErrors) return;

    const keys = Object.keys(serverErrors);
    if (keys.some((key) => ["firstName", "lastName", "email", "password", "confirmPassword"].includes(key))) {
      setStep(1);
    } else if (keys.some((key) => ["grade", "schoolName", "city", "state", "country", "interests"].includes(key))) {
      setStep(2);
    } else if (keys.some((key) => ["isUnder18", "is13Plus", "parentName", "parentEmail", "parentSignature", "studentSignature"].includes(key))) {
      setStep(3);
    } else {
      setStep(4);
    }
    setFurthestStep(4);
  }, [state.errors]);

  function serverError(name: string) {
    return firstError(state.errors, name);
  }

  function errorFor(name: string) {
    return clientErrors[name] || serverError(name);
  }

  function collectReview(form: HTMLFormElement): Review {
    const data = new FormData(form);
    return {
      name: `${String(data.get("firstName") || "")} ${String(data.get("lastName") || "")}`.trim(),
      email: String(data.get("email") || ""),
      school: String(data.get("schoolName") || ""),
      grade: String(data.get("grade") || ""),
      interests: data.getAll("interests").map(String),
      isUnder18: String(data.get("isUnder18") || ""),
      is13Plus: Boolean(data.get("is13Plus")),
      parentName: String(data.get("parentName") || ""),
      parentEmail: String(data.get("parentEmail") || ""),
      parentSignature: String(data.get("parentSignature") || ""),
      studentSignature: String(data.get("studentSignature") || "")
    };
  }

  function validate(targetStep: Step) {
    if (!formRef.current) return {};
    const data = new FormData(formRef.current);
    const errors: ClientErrors = {};
    const value = (name: string) => String(data.get(name) || "").trim();

    if (targetStep === 1) {
      if (!value("firstName")) errors.firstName = "Enter your first name.";
      if (!value("lastName")) errors.lastName = "Enter your last name.";
      if (!value("email")) {
        errors.email = "Enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) {
        errors.email = "Enter a valid email address.";
      }
      if (value("password").length < 12) errors.password = "Use at least 12 characters.";
      if (!value("confirmPassword")) {
        errors.confirmPassword = "Confirm your password.";
      } else if (value("password") !== value("confirmPassword")) {
        errors.confirmPassword = "Passwords must match.";
      }
    }

    if (targetStep === 2) {
      if (!value("schoolName")) errors.schoolName = "Enter your school name.";
      if (!value("grade")) errors.grade = "Choose your current grade.";
      if (!value("city")) errors.city = "Enter your city.";
      if (!value("state")) errors.state = "Enter your state or province.";
      if (!value("country")) errors.country = "Enter your country.";
    }

    if (targetStep === 3) {
      const under18Val = value("isUnder18");
      if (!under18Val) {
        errors.isUnder18 = "Select whether you are under 18 years old.";
      }
      if (!data.get("is13Plus")) {
        errors.is13Plus = "Confirm that you are at least 13 years old to use SolveSprint.";
      }

      if (under18Val === "true") {
        if (!value("parentName")) errors.parentName = "Enter your parent/guardian's full name.";
        if (!value("parentEmail")) {
          errors.parentEmail = "Enter your parent/guardian's email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("parentEmail"))) {
          errors.parentEmail = "Enter a valid parent/guardian email address.";
        }
        if (!value("parentSignature")) errors.parentSignature = "Enter your parent/guardian's electronic signature.";
      }

      if (!value("studentSignature")) {
        errors.studentSignature = "Enter your electronic signature.";
      }
    }

    if (targetStep === 4) {
      if (!data.get("agreeLegal")) {
        errors.agreeLegal = "Confirm that you have read and agreed to the Legal & Safety Center terms.";
      }
      if (!data.get("agree")) {
        errors.agree = "Accept the Terms of Use and Privacy Policy.";
      }
    }

    return errors;
  }

  function focusFirstError(errors: ClientErrors) {
    const firstName = Object.keys(errors)[0];
    if (!firstName) return;
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstName}"]`)?.focus();
    });
  }

  function scrollToFormStart() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  }

  function continueFrom(currentStep: 1 | 2 | 3) {
    const errors = validate(currentStep);
    setClientErrors(errors);
    if (Object.keys(errors).length) {
      focusFirstError(errors);
      return;
    }

    if (formRef.current) setReview(collectReview(formRef.current));
    const nextStep = (currentStep + 1) as Step;
    setStep(nextStep);
    setFurthestStep((current) => Math.max(current, nextStep) as Step);
    scrollToFormStart();
  }

  function goBack(target: Step) {
    setClientErrors({});
    setStep(target);
    scrollToFormStart();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const accountErrors = validate(1);
    const profileErrors = validate(2);
    const verificationErrors = validate(3);
    const confirmErrors = validate(4);
    const errors = { ...accountErrors, ...profileErrors, ...verificationErrors, ...confirmErrors };

    if (Object.keys(errors).length) {
      event.preventDefault();
      setClientErrors(errors);
      const firstErrorName = Object.keys(errors)[0];
      const accountNames = ["firstName", "lastName", "email", "password", "confirmPassword"];
      const profileNames = ["schoolName", "grade", "city", "state", "country"];
      const verificationNames = ["isUnder18", "is13Plus", "parentName", "parentEmail", "parentSignature", "studentSignature"];
      const errorStep: Step = accountNames.includes(firstErrorName)
        ? 1
        : profileNames.includes(firstErrorName)
          ? 2
          : verificationNames.includes(firstErrorName)
            ? 3
            : 4;
      setStep(errorStep);
      focusFirstError(errors);
    }
  }

  return (
    <>
      <div className="student-signup-intro">
        <p>Student registration</p>
        <h1>Create your account.</h1>
        <span>Join real challenges, build with a team, and create work you can show.</span>
        <small>
          Already registered? <Link href="/login">Log in</Link>
        </small>
      </div>

      <nav className="student-signup-progress" aria-label="Registration progress">
        <ol>
          {steps.map((item, index) => {
            const itemStep = (index + 1) as Step;
            return (
              <li key={item.number} data-active={step === itemStep} data-complete={step > itemStep}>
                <button
                  type="button"
                  disabled={itemStep > furthestStep}
                  onClick={() => goBack(itemStep)}
                  aria-current={step === itemStep ? "step" : undefined}
                >
                  <span>{item.number}</span>
                  {item.label}
                </button>
                <span className="student-signup-progress__track" aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      </nav>

      <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate className="student-signup-form">
        {token ? <input type="hidden" name="token" value={token} /> : null}
        <div className="student-signup-status" aria-live="polite">
          {state.message ? <p>{state.message}</p> : null}
        </div>

        <fieldset hidden={step !== 1} className="student-signup-step">
          <legend className="sr-only">Account information</legend>

          <div className="student-auth-field-grid">
            <AuthField
              label="First name"
              name="firstName"
              autoComplete="given-name"
              defaultValue={(values?.firstName as string) || ""}
              error={errorFor("firstName")}
              required
            />
            <AuthField
              label="Last name"
              name="lastName"
              autoComplete="family-name"
              defaultValue={(values?.lastName as string) || ""}
              error={errorFor("lastName")}
              required
            />
          </div>

          <AuthField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            readOnly={Boolean(lockedEmail)}
            defaultValue={lockedEmail || (values?.email as string) || ""}
            error={errorFor("email")}
            required
          />

          <PasswordField
            label="Password"
            name="password"
            visible={showPassword}
            onToggle={() => setShowPassword((visible) => !visible)}
            error={errorFor("password")}
            hint="Use at least 12 characters."
            autoComplete="new-password"
            minLength={12}
          />
          <PasswordField
            label="Confirm password"
            name="confirmPassword"
            visible={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((visible) => !visible)}
            error={errorFor("confirmPassword")}
            autoComplete="new-password"
            minLength={12}
          />

          <div className="student-signup-actions student-signup-actions--single">
            <button type="button" onClick={() => continueFrom(1)}>
              Continue <span aria-hidden="true">→</span>
            </button>
          </div>
        </fieldset>

        <fieldset hidden={step !== 2} className="student-signup-step">
          <legend>Student profile</legend>
          <p className="student-signup-step__lead">
            This helps determine eligibility and surface relevant challenge fields.
          </p>

          <AuthField
            label="School name"
            name="schoolName"
            autoComplete="organization"
            defaultValue={(values?.schoolName as string) || ""}
            error={errorFor("schoolName")}
            required
          />

          <div className="student-auth-field-grid">
            <AuthSelect
              label="Grade"
              name="grade"
              defaultValue={(values?.grade as string) || ""}
              error={errorFor("grade")}
            >
              <option value="">Select grade</option>
              {["9", "10", "11", "12"].map((grade) => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </AuthSelect>
            <AuthField
              label="City"
              name="city"
              autoComplete="address-level2"
              defaultValue={(values?.city as string) || ""}
              error={errorFor("city")}
              required
            />
          </div>

          <div className="student-auth-field-grid">
            <AuthField
              label="State or province"
              name="state"
              autoComplete="address-level1"
              defaultValue={(values?.state as string) || ""}
              error={errorFor("state")}
              required
            />
            <AuthField
              label="Country"
              name="country"
              autoComplete="country-name"
              defaultValue={(values?.country as string) || "United States"}
              error={errorFor("country")}
              required
            />
          </div>

          <fieldset className="student-interest-fieldset">
            <legend>Interests</legend>
            <p>Choose any fields you would be interested in exploring.</p>
            <div className="student-interest-grid">
              {interests.map((interest) => (
                <label key={interest}>
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    defaultChecked={selectedInterests.includes(interest)}
                  />
                  <span>{interest === "Writing/Pitching" ? "Writing / Pitching" : interest}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="student-signup-actions">
            <button type="button" className="student-signup-actions__back" onClick={() => goBack(1)}>
              Back
            </button>
            <button type="button" onClick={() => continueFrom(2)}>
              Continue <span aria-hidden="true">→</span>
            </button>
          </div>
        </fieldset>

        <fieldset hidden={step !== 3} className="student-signup-step">
          <legend>Verification</legend>
          <p className="student-signup-step__lead">
            SolveSprint is open to high school students ages 13+. Please verify your age status and signatures below.
          </p>

          <AuthSelect
            label="Are you under 18 years old?"
            name="isUnder18"
            defaultValue={(values?.isUnder18 as string) || isUnder18}
            onChange={(e) => setIsUnder18(e.target.value)}
            error={errorFor("isUnder18")}
            required
          >
            <option value="">Select age status</option>
            <option value="true">Yes, I am under 18 years old</option>
            <option value="false">No, I am 18 years old or older</option>
          </AuthSelect>

          <div className="student-legal-confirmations">
            <LegalCheckbox
              name="is13Plus"
              defaultChecked={Boolean(values?.is13Plus ?? true)}
              error={errorFor("is13Plus")}
              label="I confirm that I am at least 13 years old. (Users must be 13+ to join SolveSprint)."
            />
          </div>

          {(isUnder18 === "true" || values?.isUnder18 === "true") && (
            <div className="student-verification-box">
              <p className="student-verification-box__title">Parent / Guardian Permission</p>
              <div className="student-auth-field-grid">
                <AuthField
                  label="Parent / Guardian full name"
                  name="parentName"
                  autoComplete="name"
                  defaultValue={(values?.parentName as string) || ""}
                  error={errorFor("parentName")}
                  required
                />
                <AuthField
                  label="Parent / Guardian email address"
                  name="parentEmail"
                  type="email"
                  autoComplete="email"
                  defaultValue={(values?.parentEmail as string) || ""}
                  error={errorFor("parentEmail")}
                  required
                />
              </div>

              <AuthField
                label="Parent / Guardian electronic signature (Type full legal name)"
                name="parentSignature"
                placeholder="e.g. Jane Doe"
                defaultValue={(values?.parentSignature as string) || ""}
                error={errorFor("parentSignature")}
                required
              />
            </div>
          )}

          <AuthField
            label="Student electronic signature (Type full legal name)"
            name="studentSignature"
            placeholder="e.g. Alex Smith"
            defaultValue={(values?.studentSignature as string) || ""}
            error={errorFor("studentSignature")}
            required
          />

          <div className="student-signup-actions">
            <button type="button" className="student-signup-actions__back" onClick={() => goBack(2)}>
              Back
            </button>
            <button type="button" onClick={() => continueFrom(3)}>
              Continue <span aria-hidden="true">→</span>
            </button>
          </div>
        </fieldset>

        <fieldset hidden={step !== 4} className="student-signup-step">
          <legend>Review and confirm</legend>
          <p className="student-signup-step__lead">
            Check the essentials, then confirm that you’re eligible to participate.
          </p>

          <div className="student-signup-review">
            <ReviewGroup label="Account" onEdit={() => goBack(1)}>
              <p>{review.name || "Student name"}</p>
              <span>{review.email || "Email address"}</span>
            </ReviewGroup>
            <ReviewGroup label="Student profile" onEdit={() => goBack(2)}>
              <p>
                {review.school || "School"}{review.grade ? ` · Grade ${review.grade}` : ""}
              </p>
              <span>{review.interests.length ? review.interests.join(", ") : "No interests selected"}</span>
            </ReviewGroup>
            <ReviewGroup label="Verification" onEdit={() => goBack(3)}>
              <p>
                Age status: {review.isUnder18 === "true" ? "Under 18" : review.isUnder18 === "false" ? "18 or older" : "Not specified"}
              </p>
              {review.isUnder18 === "true" && (
                <span>Parent/Guardian: {review.parentName} ({review.parentEmail}) · Parent signature: {review.parentSignature}</span>
              )}
              <span>Student signature: {review.studentSignature}</span>
            </ReviewGroup>
          </div>

          <div className="student-legal-confirmations">
            <LegalCheckbox
              name="agreeLegal"
              defaultChecked={Boolean(values?.agreeLegal)}
              error={errorFor("agreeLegal")}
              label={
                <>
                  I have read and agree to the{" "}
                  <a href="/legal" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", fontWeight: 600 }}>
                    Legal & Safety Center
                  </a>{" "}
                  terms and policies.
                </>
              }
            />
            <LegalCheckbox
              name="agree"
              defaultChecked={Boolean(values?.agree)}
              error={errorFor("agree")}
              label={
                <>
                  I agree to the{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>Terms of Use</a> and{" "}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>Privacy Policy</a>.
                </>
              }
            />
          </div>

          <p className="student-signup-privacy">
            We use this information to manage your account, determine challenge eligibility, and operate student teams.
          </p>

          <div className="student-signup-actions student-signup-actions--submit">
            <button type="button" className="student-signup-actions__back" onClick={() => goBack(3)}>
              Back
            </button>
            <AuthSubmitButton pendingText="Creating account...">Create student account</AuthSubmitButton>
          </div>

          <p className="student-signup-login">
            Already registered? <Link href="/login">Log in</Link>
          </p>
        </fieldset>
      </form>
    </>
  );
}

function LegalCheckbox({
  name,
  label,
  error,
  defaultChecked,
  onChange
}: {
  name: string;
  label: ReactNode;
  error?: string;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <label className="student-legal-checkbox">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        onChange={onChange}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      />
      <span>
        {label}
        {error ? <em id={errorId}>{error}</em> : null}
      </span>
    </label>
  );
}

function ReviewGroup({
  label,
  onEdit,
  children
}: {
  label: string;
  onEdit: () => void;
  children: ReactNode;
}) {
  return (
    <section>
      <div>
        <h2>{label}</h2>
        <button type="button" onClick={onEdit}>
          Edit
        </button>
      </div>
      {children}
    </section>
  );
}
