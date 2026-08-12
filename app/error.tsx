"use client";

export default function GlobalRouteError({ reset }: { reset: () => void }) {
  return (
    <section className="system-state">
      <div className="system-state__inner">
        <p>Something went wrong</p>
        <h1>We couldn’t load this page.</h1>
        <span>Try the request again. If the problem continues, return to the previous page.</span>
        <div>
          <button type="button" onClick={reset}>Try again</button>
        </div>
      </div>
    </section>
  );
}
