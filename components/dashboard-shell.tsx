import Link from "next/link";
import type { ReactNode } from "react";
import { SiteBrand } from "@/components/site-brand";

type WorkspaceAudience = "student" | "organization" | "admin";

const workspaceNav: Record<WorkspaceAudience, Array<{ href: string; label: string }>> = {
  student: [
    { href: "/student/my-challenges", label: "My challenges" },
    { href: "/challenges", label: "Browse" },
    { href: "/student/profile", label: "Profile" }
  ],
  organization: [
    { href: "/org/dashboard", label: "Overview" },
    { href: "/org/challenges/new", label: "New challenge" },
    { href: "/challenges", label: "Public directory" }
  ],
  admin: [
    { href: "/admin", label: "Review queue" },
    { href: "/challenges", label: "Public directory" },
    { href: "/leaderboard", label: "Recognition" }
  ]
};

const workspaceMeta: Record<WorkspaceAudience, { label: string; number: string }> = {
  student: { label: "Student league", number: "01" },
  organization: { label: "Host studio", number: "02" },
  admin: { label: "League control", number: "03" }
};

export function DashboardShell({
  audience,
  title,
  body,
  actions,
  children
}: {
  audience: WorkspaceAudience;
  title: string;
  body?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const meta = workspaceMeta[audience];

  return (
    <section className="workspace-page" data-workspace={audience}>
      <header className="workspace-header">
        <Link href="/" className="workspace-brand" aria-label="SolveSprint™ home">
          <SiteBrand descriptor={meta.label} copyClassName="workspace-brand__copy" />
        </Link>
        <nav aria-label={`${audience} workspace navigation`}>
          {workspaceNav[audience].map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link href="/logout" className="workspace-logout">Log out</Link>
      </header>
      <div className="workspace-shell">
        <div className="workspace-heading">
          <div className="workspace-heading__index" aria-hidden="true">
            <span>Workspace</span>
            <strong>{meta.number}</strong>
          </div>
          <div className="workspace-heading__main">
            <div>
              <p>{audience === "admin" ? "Platform operations" : meta.label}</p>
              <h1>{title}</h1>
              {body ? <span>{body}</span> : null}
            </div>
            {actions ? <div className="workspace-heading__actions">{actions}</div> : null}
          </div>
        </div>
        <div className="workspace-content">{children}</div>
      </div>
    </section>
  );
}
