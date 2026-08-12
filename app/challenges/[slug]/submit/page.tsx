// Obsolete competition submission route redirected to /how-it-works.
// Note: Team submission writes required role: TeamRole.LEAD.
import { redirect } from "next/navigation";

export default function ChallengeSubmitPage() {
  redirect("/how-it-works");
}
