import { redirect } from "next/navigation";
export default function LegalCookiesRedirect() {
  redirect("/cookie-policy");
}
