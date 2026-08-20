import Image from "next/image";
import { APPROVED_IMAGES } from "@/components/home/HomeMedia";

const directoryImage = {
  src: APPROVED_IMAGES.studentsCollaborating.src,
  alt: APPROVED_IMAGES.studentsCollaborating.alt,
  focalPoint: APPROVED_IMAGES.studentsCollaborating.objectPosition
} as const;

export function ChallengeDirectoryHero() {
  return (
    <section className="challenge-directory-hero">
      <div className="challenge-directory-hero__marquee" aria-hidden="true">
        <span>REAL BRIEFS</span><i />
        <span>STUDENT TEAMS</span><i />
        <span>WORK WORTH SHOWING</span>
      </div>
      <div className="challenge-directory-shell challenge-directory-hero__grid">
        <div className="challenge-directory-hero__copy">
          <p>Challenge directory</p>
          <h1>Find a brief worth building.</h1>
          <span>
            Explore verified challenges from companies, nonprofits, and schools.
            Form a team, register, and submit before the deadline.
          </span>
        </div>
        <figure className="challenge-directory-hero__figure">
          <div className="challenge-directory-hero__image">
            <Image
              src={directoryImage.src}
              alt={directoryImage.alt}
              width={1280}
              height={853}
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 40vw, 460px"
              style={{ objectPosition: directoryImage.focalPoint }}
            />
            <span className="challenge-directory-hero__stamp" aria-hidden="true">
              <strong>SS</strong>
              <small>OPEN LEAGUE</small>
            </span>
          </div>
          <figcaption>
            Student teams turn focused briefs into work they can explain, defend, and show.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
