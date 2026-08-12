"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";

export interface TocItem {
  id: string;
  label: string;
}

export interface LegalDocMeta {
  version?: string;
  effectiveDate?: string;
  lastUpdated?: string;
  contact?: string | null;
  jurisdiction?: string;
  archiveHref?: string | null;
  relatedLinks?: { href: string; label: string }[];
}

export function LegalPage({
  eyebrow,
  title,
  summary,
  toc,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  toc?: TocItem[];
  meta?: LegalDocMeta;
  children: ReactNode;
}) {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <article className="lp-article">
      {/* ── Document header ── */}
      <header className="lp-header">
        <div className="lp-header__inner">
          <Link href="/legal" className="lp-back">
            ← Legal &amp; Safety
          </Link>
          <p className="lp-eyebrow">{eyebrow}</p>
          <h1 className="lp-title">{title}</h1>
          <p className="lp-summary">{summary}</p>

          {/* Metadata row */}
          {meta && (
            <dl className="lp-meta-row">
              {meta.version && (
                <>
                  <dt>Version</dt>
                  <dd>{meta.version}</dd>
                </>
              )}
              {meta.effectiveDate && (
                <>
                  <dt>Effective</dt>
                  <dd>{meta.effectiveDate}</dd>
                </>
              )}
              {meta.lastUpdated && (
                <>
                  <dt>Updated</dt>
                  <dd>{meta.lastUpdated}</dd>
                </>
              )}
              {meta.jurisdiction && (
                <>
                  <dt>Jurisdiction</dt>
                  <dd>{meta.jurisdiction}</dd>
                </>
              )}
              {meta.contact !== undefined && (
                <>
                  <dt>Contact</dt>
                  <dd>
                    {meta.contact ? (
                      <a href={`mailto:${meta.contact}`}>{meta.contact}</a>
                    ) : (
                      <a href="/legal#contact">Contact SolveSprint</a>
                    )}
                  </dd>
                </>
              )}
              {meta.archiveHref && (
                <>
                  <dt>Archive</dt>
                  <dd>
                    <a href={meta.archiveHref}>Previous versions</a>
                  </dd>
                </>
              )}
            </dl>
          )}
        </div>
      </header>

      {/* ── Body: sidebar TOC + content ── */}
      <div className="lp-body">
        {/* Mobile TOC toggle */}
        {toc && toc.length > 0 && (
          <div className="lp-toc-mobile">
            <button
              className="lp-toc-toggle"
              aria-expanded={tocOpen}
              onClick={() => setTocOpen((o) => !o)}
            >
              On this page
              <span className="lp-toc-toggle__icon" aria-hidden="true">
                {tocOpen ? "▲" : "▼"}
              </span>
            </button>
            {tocOpen && (
              <nav className="lp-toc-panel" aria-label="On this page">
                <ol>
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} onClick={() => setTocOpen(false)}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
        )}

        {/* Desktop sticky sidebar */}
        {toc && toc.length > 0 && (
          <aside className="lp-toc-sidebar" aria-label="On this page">
            <p className="lp-toc-sidebar__heading">On this page</p>
            <nav>
              <ol>
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}

        {/* Document content */}
        <div className={`lp-content${toc && toc.length ? " lp-content--with-toc" : ""}`}>
          {children}

          {/* Related links */}
          {meta?.relatedLinks && meta.relatedLinks.length > 0 && (
            <div className="lp-related">
              <p className="lp-related__heading">Related documents</p>
              <ul>
                {meta.relatedLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="lp-footer-nav">
            <Link href="/legal">← Back to Legal &amp; Safety</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id?: string;
  number?: string | number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="lp-section" id={id}>
      <h2 className="lp-section__heading">
        {number !== undefined && (
          <span className="lp-section__num" aria-hidden="true">
            {number}.&nbsp;
          </span>
        )}
        {title}
      </h2>
      <div className="lp-section__body">{children}</div>
    </section>
  );
}

export function LegalCallout({
  children,
  variant = "note",
}: {
  children: ReactNode;
  variant?: "note" | "warning" | "important";
}) {
  return <div className={`lp-callout lp-callout--${variant}`}>{children}</div>;
}
