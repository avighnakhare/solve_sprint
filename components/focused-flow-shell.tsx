import Link from "next/link";
import type { ReactNode } from "react";
import { SiteBrand } from "@/components/site-brand";

export function FocusedFlowShell({
  eyebrow,
  title,
  body,
  children
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section className="focused-auth-page">
      <header>
        <Link href="/" aria-label="SolveSprint™ home"><SiteBrand /></Link>
        <p>Already registered? <Link href="/login">Log in</Link></p>
      </header>
      <main>
        <div className="focused-auth-heading">
          <p>{eyebrow}</p>
          <h1>{title}</h1>
          <span>{body}</span>
        </div>
        <div className="focused-auth-content">{children}</div>
      </main>
    </section>
  );
}
