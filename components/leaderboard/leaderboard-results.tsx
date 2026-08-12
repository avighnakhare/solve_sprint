import Link from "next/link";

export type LeaderboardRow = {
  teamId: string;
  teamName: string;
  points: number;
  rank: number;
  awardedChallengeCount: number;
  latestChallengeTitle: string;
};

function awardedChallengeLabel(count: number) {
  return `${count} awarded ${count === 1 ? "challenge" : "challenges"}`;
}

function rankLabel(rank: number) {
  return String(rank).padStart(2, "0");
}

function Points({ value }: { value: number }) {
  return (
    <span className="leaderboard-points">
      <strong>{value.toLocaleString("en-US")}</strong>
      <small>PTS</small>
    </span>
  );
}

export function LeaderboardResults({ rows }: { rows: LeaderboardRow[] }) {
  if (!rows.length) {
    return <LeaderboardEmptyState />;
  }

  return (
    <section className="leaderboard-standings" aria-labelledby="current-standings-title">
      <div className="leaderboard-shell">
        <header className="leaderboard-section-header">
          <p id="current-standings-title">Current standings</p>
          <span>
            {rows.length} awarded {rows.length === 1 ? "team" : "teams"}
          </span>
        </header>

        <div className="leaderboard-table-wrap">
          <table className="leaderboard-table">
            <caption className="sr-only">
              Current SolveSprint team standings based on awarded points
            </caption>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Team</th>
                <th scope="col">Recognized work</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.teamId} data-first={row.rank === 1}>
                  <td>
                    <span className="leaderboard-rank">{rankLabel(row.rank)}</span>
                  </td>
                  <td>
                    <strong className="leaderboard-team-name">{row.teamName}</strong>
                  </td>
                  <td>
                    <span className="leaderboard-work">
                      <strong>{awardedChallengeLabel(row.awardedChallengeCount)}</strong>
                      <small>{row.latestChallengeTitle}</small>
                    </span>
                  </td>
                  <td>
                    <Points value={row.points} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ol className="leaderboard-mobile-list" aria-label="Current SolveSprint team standings">
          {rows.map((row) => (
            <li key={row.teamId} data-first={row.rank === 1}>
              <span className="leaderboard-rank">{rankLabel(row.rank)}</span>
              <div className="leaderboard-mobile-list__team">
                <strong className="leaderboard-team-name">{row.teamName}</strong>
                <span className="leaderboard-work">
                  <strong>{awardedChallengeLabel(row.awardedChallengeCount)}</strong>
                  <small>{row.latestChallengeTitle}</small>
                </span>
              </div>
              <Points value={row.points} />
            </li>
          ))}
        </ol>

        {rows.length === 1 ? (
          <p className="leaderboard-standings__note">
            Standings expand as challenge hosts publish additional results.
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function LeaderboardEmptyState() {
  return (
    <section className="leaderboard-empty" aria-labelledby="current-standings-title">
      <div className="leaderboard-shell leaderboard-empty__grid">
        <p className="leaderboard-eyebrow" id="current-standings-title">
          Current standings
        </p>
        <div>
          <h2>Results are being finalized.</h2>
          <p>
            Verified teams will appear here after challenge hosts publish their results.
          </p>
          <Link href="/challenges">
            Browse active challenges <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
