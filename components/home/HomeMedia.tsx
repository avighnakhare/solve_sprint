import Image from "next/image";
import type { CSSProperties } from "react";

export type HomeImageSlot = {
  id: string;
  src: string | null;
  mobileSrc?: string | null;
  expectedPath: string;
  alt: string;
  aspectRatio: `${number} / ${number}`;
  focalPoint: string;
  description: string;
};

export const homeImages = {
  foundersGroup: {
    id: "IMG-01_FOUNDERS_GROUP",
    src: null,
    mobileSrc: null,
    expectedPath: "/images/home/founders-team.webp",
    alt: "SolveSprint founders Avighna Khare and Kavish Shah working together",
    aspectRatio: "4 / 5",
    focalPoint: "50% 40%",
    description: "SolveSprint founders working together in a real environment"
  },
  studentsBuilding: {
    id: "IMG-02_STUDENTS_BUILDING",
    src: "/images/home/students-building.png",
    mobileSrc: null,
    expectedPath: "/images/home/students-building.png",
    alt: "Students collaborating on a challenge solution",
    aspectRatio: "3 / 2",
    focalPoint: "50% 42%",
    description: "Students collaborating around a laptop, sketch, whiteboard, or prototype"
  },
  submissionReview: {
    id: "IMG-03_SUBMISSION_REVIEW",
    src: "/images/home/submission-review.png",
    mobileSrc: null,
    expectedPath: "/images/home/submission-review.png",
    alt: "Reviewers discussing and scoring a student submission",
    aspectRatio: "3 / 2",
    focalPoint: "58% 50%",
    description: "A person or small group reviewing, discussing, or scoring a submission"
  },
  studentProject: {
    id: "IMG-04_STUDENT_PROJECT",
    src: "/images/home/student-project.png",
    mobileSrc: null,
    expectedPath: "/images/home/student-project.png",
    alt: "A student presenting work created during a challenge",
    aspectRatio: "4 / 5",
    focalPoint: "56% 42%",
    description: "A student working on or presenting a real project, prototype, or portfolio"
  },
  organizationBrief: {
    id: "IMG-05_ORGANIZATION_BRIEF",
    src: "/images/home/organization-brief.png",
    mobileSrc: null,
    expectedPath: "/images/home/organization-brief.png",
    alt: "An organization team preparing a focused challenge brief",
    aspectRatio: "4 / 5",
    focalPoint: "52% 44%",
    description: "A real organization meeting, challenge briefing, or whiteboard session"
  },
  categoryBusiness: {
    id: "IMG-06_CATEGORY_BUSINESS",
    src: "/images/home/category-business.png",
    mobileSrc: null,
    expectedPath: "/images/home/category-business.png",
    alt: "Students developing a business and outreach concept",
    aspectRatio: "4 / 5",
    focalPoint: "64% 48%",
    description: "Business, marketing, and outreach work in progress"
  },
  categoryTechnology: {
    id: "IMG-07_CATEGORY_TECHNOLOGY",
    src: "/images/home/category-technology.png",
    mobileSrc: null,
    expectedPath: "/images/home/category-technology.png",
    alt: "A student product design and technology project",
    aspectRatio: "4 / 5",
    focalPoint: "31% 46%",
    description: "Product design, technology, or AI work in progress"
  },
  categoryImpact: {
    id: "IMG-08_CATEGORY_IMPACT",
    src: "/images/home/category-impact.png",
    mobileSrc: null,
    expectedPath: "/images/home/category-impact.png",
    alt: "Students working on a sustainability or community project",
    aspectRatio: "4 / 5",
    focalPoint: "50% 46%",
    description: "Sustainability or community-impact work in progress"
  },
  recognition: {
    id: "IMG-09_RECOGNITION",
    src: "/images/home/recognition-trophy.png",
    mobileSrc: null,
    expectedPath: "/images/home/recognition-trophy.png",
    alt: "A team raising a trophy together at sunrise",
    aspectRatio: "16 / 10",
    focalPoint: "50% 50%",
    description: "A team raising a trophy together in warm sunrise light"
  }
} satisfies Record<string, HomeImageSlot>;

export function HomeMedia({
  slot,
  sizes,
  className = ""
}: {
  slot: HomeImageSlot;
  sizes: string;
  className?: string;
}) {
  const style = {
    aspectRatio: slot.aspectRatio,
    "--media-focal-point": slot.focalPoint
  } as CSSProperties;

  if (!slot.src) {
    return (
      <div
        className={`home-media home-media--placeholder bg-mist border border-orange/20 flex items-center justify-center p-6 text-center ${className}`}
        style={style}
        role="img"
        aria-label={slot.alt}
        data-image-slot={slot.id}
      >
        <div className="text-muted text-sm italic">
          <p>{slot.alt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`home-media ${className}`} style={style} data-image-slot={slot.id}>
      <picture>
        {slot.mobileSrc ? <source media="(max-width: 767px)" srcSet={slot.mobileSrc} /> : null}
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          className="home-media__image"
        />
      </picture>
    </div>
  );
}
