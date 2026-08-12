import { LeaderboardHero } from "@/components/leaderboard/leaderboard-hero";

export default function LeaderboardLoading() {
  return (
    <div className="leaderboard-page">
      <LeaderboardHero />
      <section
        className="leaderboard-standings leaderboard-loading"
        aria-labelledby="leaderboard-loading-title"
        aria-busy="true"
      >
        <div className="leaderboard-shell">
          <header className="leaderboard-section-header">
            <p id="leaderboard-loading-title">Current standings</p>
            <span role="status" aria-live="polite">
              Loading standings…
            </span>
          </header>
          <div className="leaderboard-loading__rows" aria-hidden="true">
            {[0, 1, 2].map((row) => (
              <div key={row}>
                <span />
                <span />
                <span />
                <span />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
