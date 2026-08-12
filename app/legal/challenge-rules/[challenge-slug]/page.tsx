import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalCallout } from "@/components/legal-page";
import { LEGAL_META } from "@/lib/legal-meta";

interface Props {
  params: Promise<{ "challenge-slug": string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "challenge-slug": slug } = await params;
  return {
    title: `Challenge Official Rules — ${slug} | SolveSprint`,
    description: `Official rules for the SolveSprint challenge: ${slug}.`,
  };
}

export default async function ChallengeRulesPage({ params }: Props) {
  const { "challenge-slug": slug } = await params;

  return (
    <LegalPage
      eyebrow="Participation"
      title="Challenge Official Rules"
      summary="Each challenge publishes its own Official Rules covering eligibility, schedule, deliverables, judging criteria, prizes, and intellectual-property terms."
      meta={{
        version: LEGAL_META.version,
        effectiveDate: LEGAL_META.effectiveDate,
        lastUpdated: LEGAL_META.lastUpdated,
        relatedLinks: [
          { href: "/rules", label: "League Rules" },
          { href: "/legal", label: "Legal & Safety" },
        ],
      }}
    >
      <LegalCallout variant="note">
        <strong>Official rules for this challenge have not been published.</strong>
        <br />
        Challenge-specific Official Rules are authored and approved individually.
        Rules for <em>{slug}</em> are not yet available. Check back once the
        challenge has opened for registration, or visit the{" "}
        <Link href="/challenges">challenges page</Link> for active challenges.
      </LegalCallout>

      <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.7, marginTop: "1.5rem" }}>
        When published, Official Rules for each challenge will identify the
        sponsor and administrator; eligible ages, grades, and locations; opening
        and closing dates with time zone; required deliverables; permitted and
        prohibited tools; judging criteria and weights; prizes and their
        approximate retail value; ownership and license terms; and winner
        verification requirements.
      </p>

      <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.7, marginTop: "0.75rem" }}>
        Every challenge is also governed by the{" "}
        <Link href="/rules">SolveSprint League Rules</Link> and the{" "}
        <Link href="/terms">Terms of Use</Link>. Do not substitute a challenge
        brief, FAQ, social post, or email for the Official Rules.
      </p>
    </LegalPage>
  );
}
