export default function ChallengesLoading() {
  return (
    <main className="challenge-directory-page" aria-busy="true" aria-label="Loading challenge directory">
      <section className="challenge-directory-hero challenge-directory-loading">
        <div className="challenge-directory-shell challenge-directory-hero__grid">
          <div className="challenge-directory-loading__copy"><span /><span /><span /></div>
          <div className="challenge-directory-loading__image" />
        </div>
      </section>
      <section className="challenge-directory-results">
        <div className="challenge-directory-shell challenge-directory-loading__cards">
          {[0, 1, 2, 3].map((item) => <div key={item} />)}
        </div>
      </section>
    </main>
  );
}
