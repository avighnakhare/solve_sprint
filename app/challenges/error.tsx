"use client";

export default function ChallengesError({ reset }: { reset: () => void }) {
  return (
    <main className="challenge-directory-page">
      <section className="challenge-directory-error">
        <div className="challenge-directory-shell">
          <p>Challenge directory</p>
          <h1>We couldn’t load the challenges.</h1>
          <span>Please try the request again. Your filters have not changed.</span>
          <button type="button" onClick={reset}>Try again</button>
        </div>
      </section>
    </main>
  );
}
