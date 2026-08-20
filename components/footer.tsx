import Link from "next/link";
import { SiteBrand } from "./site-brand";

export function Footer() {
  return (
    <footer className="w-full bg-paper-light border-t border-line text-ink pt-16 pb-12">
      <div className="site-container space-y-12">
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-1 space-y-4">
            <SiteBrand />
            <p className="body-standard text-ink-muted text-sm leading-relaxed">
              SolveSprint is a student-led, in-person innovation challenge for high school teams. Local organizations bring real problems; students build and present solutions.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <p className="trail-label text-tangerine font-bold">
              NAVIGATION
            </p>
            <ul className="space-y-2 text-sm font-body font-medium">
              <li>
                <Link href="/" className="hover:text-tangerine transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-tangerine transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/student" className="hover:text-tangerine transition-colors">
                  For students
                </Link>
              </li>
              <li>
                <Link href="/organization" className="hover:text-tangerine transition-colors">
                  For organizations
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-tangerine transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-tangerine transition-colors">
                  About SolveSprint
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Get Involved */}
          <div className="space-y-3">
            <p className="trail-label text-tangerine font-bold">
              GET INVOLVED
            </p>
            <ul className="space-y-2 text-sm font-body font-medium">
              <li>
                <Link href="/get-involved" className="hover:text-tangerine transition-colors">
                  Interest List &amp; Applications
                </Link>
              </li>
              <li>
                <Link href="/student" className="hover:text-tangerine transition-colors">
                  Student Teams
                </Link>
              </li>
              <li>
                <Link href="/organization" className="hover:text-tangerine transition-colors">
                  Challenge Proposals
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-tangerine transition-colors">
                  Mentor &amp; Volunteer Roles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-3">
            <p className="trail-label text-tangerine font-bold">
              LEGAL &amp; SAFETY
            </p>
            <ul className="space-y-2 text-sm font-body font-medium">
              <li>
                <Link href="/legal" className="hover:text-tangerine transition-colors">
                  Legal &amp; Safety Overview
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-tangerine transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-tangerine transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/code-of-conduct" className="hover:text-tangerine transition-colors">
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-tangerine transition-colors">
                  Official Event Rules
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-tangerine transition-colors">
                  Accessibility Commitment
                </Link>
              </li>
              <li>
                <Link href="/security-reporting" className="hover:text-tangerine transition-colors">
                  Security Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Disclaimer & Copyright */}
        <div className="border-t border-line pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted font-body">
          <p>© {new Date().getFullYear()} SolveSprint™. All rights reserved.</p>
          <p className="text-center sm:text-right max-w-md">
            SolveSprint is a student-led initiative. Stock photography is used under license for illustrative purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
