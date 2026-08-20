import Image from "next/image";
import { APPROVED_IMAGES } from "@/components/home/HomeMedia";

const leaderboardHeroImage = {
  src: APPROVED_IMAGES.livePresentation.src,
  alt: APPROVED_IMAGES.livePresentation.alt,
  focalPoint: APPROVED_IMAGES.livePresentation.objectPosition
};

export function LeaderboardHero() {
  return (
    <section className="leaderboard-hero" aria-labelledby="leaderboard-title">
      <div className="leaderboard-shell leaderboard-hero__grid">
        <div className="leaderboard-hero__copy">
          <p className="leaderboard-eyebrow">Leaderboard</p>
          <h1 id="leaderboard-title">Recognition, earned.</h1>
          <p className="leaderboard-hero__supporting">
            Standings update after challenge results are reviewed and published. Every
            point represents awarded work.
          </p>
        </div>

        <figure className="leaderboard-hero__figure">
          <div className="leaderboard-hero__image">
            <Image
              src={leaderboardHeroImage.src}
              alt={leaderboardHeroImage.alt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1099px) 48vw, 40vw"
              style={{ objectPosition: leaderboardHeroImage.focalPoint }}
            />
          </div>
          <figcaption>Awarded work is shown after results are verified.</figcaption>
        </figure>
      </div>
    </section>
  );
}

export { leaderboardHeroImage };
