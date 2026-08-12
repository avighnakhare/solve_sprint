"use client";

import { LeaderboardHero } from "@/components/leaderboard/leaderboard-hero";

export default function LeaderboardError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="leaderboard-page">
      <LeaderboardHero />
      <section className="leaderboard-error" aria-labelledby="leaderboard-error-title">
        <div className="leaderboard-shell leaderboard-error__grid">
          <p className="leaderboard-eyebrow">Current standings</p>
          <div role="alert">
            <h2 id="leaderboard-error-title">Standings couldn’t load.</h2>
            <p>Please try again in a moment.</p>
            <button type="button" onClick={reset}>
              Retry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
