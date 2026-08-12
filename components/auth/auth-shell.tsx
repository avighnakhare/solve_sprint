import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteBrand } from "@/components/site-brand";

export type AuthImageConfig = {
  expectedPath: string;
  src: string;
  alt: string;
  focalPoint: string;
};

type AuthShellProps = {
  children: ReactNode;
  image: AuthImageConfig;
  visualLabel: string;
  visualEyebrow: string;
  visualHeadline: string;
  visualSupportingText: string;
  visualMetadata: string;
  headerPrompt?: string;
  headerLinkLabel?: string;
  headerLinkHref?: string;
  pageClassName?: string;
};

export const studentAuthImage: AuthImageConfig = {
  expectedPath: "/images/auth/student-signup-team.png",
  src: "/images/auth/student-signup-team.png",
  alt: "High-school student engineering team building a robotics challenge project",
  focalPoint: "50% 50%"
};

export const loginAuthImage: AuthImageConfig = {
  expectedPath: "/images/auth/login-review-session.png",
  src: "/images/auth/login-review-session.png",
  alt: "High-school students collaborating in a high-tech modern design lab",
  focalPoint: "50% 50%"
};

export const organizationAuthImage: AuthImageConfig = {
  expectedPath: "/images/auth/organization-signup-briefing.png",
  src: "/images/auth/organization-signup-briefing.png",
  alt: "Organization leaders and mentors reviewing student innovation briefs in a conference lab",
  focalPoint: "50% 50%"
};

export function AuthShell({
  children,
  image,
  visualLabel,
  visualEyebrow,
  visualHeadline,
  visualSupportingText,
  visualMetadata,
  pageClassName
}: AuthShellProps) {
  return (
    <section className={["student-auth-page", pageClassName].filter(Boolean).join(" ")}>
      <div className="student-auth-layout">
        <aside className="student-auth-visual" aria-label={visualLabel}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1099px) 100vw, 43vw"
            style={{ objectPosition: image.focalPoint }}
          />
          <div className="student-auth-visual__shade" />
          <div className="student-auth-visual__copy">
            <p>{visualEyebrow}</p>
            <h2>{visualHeadline}</h2>
            <span>{visualSupportingText}</span>
            <small>{visualMetadata}</small>
          </div>
        </aside>

        <div className="student-auth-form-panel">
          <div className="student-auth-form-column">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function StudentAuthShell({ children }: { children: ReactNode }) {
  return (
    <AuthShell
      image={studentAuthImage}
      visualLabel="About the SolveSprint student league"
      visualEyebrow="SolveSprint • Student League"
      visualHeadline="Build work worth showing."
      visualSupportingText="Take on a real brief, work with a team, and leave with proof of what you can do."
      visualMetadata="High-school students • Ages 13+"
      headerPrompt="Already have an account?"
      headerLinkLabel="Log in"
      headerLinkHref="/login"
    >
      {children}
    </AuthShell>
  );
}
