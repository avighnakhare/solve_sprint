import Image from "next/image";
import type { CSSProperties } from "react";

export type ApprovedImage = {
  id: string;
  src: string;
  srcSet: string;
  photographer: string;
  sourceUrl: string;
  alt: string;
  aspectRatio: string;
  objectPosition: string;
  routes: string[];
  disclaimer: string;
};

export const APPROVED_IMAGES: Record<string, ApprovedImage> = {
  studentsCollaborating: {
    id: "IMG-01_STUDENTS_COLLABORATING",
    src: "/images/editorial/students-collaborating.webp",
    srcSet: "/images/editorial/students-collaborating-640w.webp 640w, /images/editorial/students-collaborating-960w.webp 960w, /images/editorial/students-collaborating-1280w.webp 1280w, /images/editorial/students-collaborating-1600w.webp 1600w",
    photographer: "Max Fischer",
    sourceUrl: "https://www.pexels.com/photo/5212697/",
    alt: "Two student team members collaborating over a laptop in a classroom",
    aspectRatio: "3 / 2",
    objectPosition: "50% 35%",
    routes: ["/", "/student"],
    disclaimer: "Stock photo for illustrative purposes. Subjects not affiliated with SolveSprint."
  },
  classroomHandsOn: {
    id: "IMG-02_CLASSROOM_HANDS_ON",
    src: "/images/editorial/classroom-hands-on.webp",
    srcSet: "/images/editorial/classroom-hands-on-640w.webp 640w, /images/editorial/classroom-hands-on-960w.webp 960w, /images/editorial/classroom-hands-on-1280w.webp 1280w, /images/editorial/classroom-hands-on-1600w.webp 1600w",
    photographer: "Asia Culture Center",
    sourceUrl: "https://www.pexels.com/photo/14382529/",
    alt: "High school students engaged in hands-on classroom problem solving",
    aspectRatio: "3 / 2",
    objectPosition: "50% 40%",
    routes: ["/"],
    disclaimer: "Stock photo for illustrative purposes. Subjects not affiliated with SolveSprint."
  },
  organizationWhiteboard: {
    id: "IMG-03_ORGANIZATION_WHITEBOARD",
    src: "/images/editorial/organization-whiteboard.webp",
    srcSet: "/images/editorial/organization-whiteboard-640w.webp 640w, /images/editorial/organization-whiteboard-960w.webp 960w, /images/editorial/organization-whiteboard-1280w.webp 1280w, /images/editorial/organization-whiteboard-1600w.webp 1600w",
    photographer: "Artem Podrez",
    sourceUrl: "https://www.pexels.com/photo/8518810/",
    alt: "Organization representative writing a problem brief on a whiteboard",
    aspectRatio: "3 / 2",
    objectPosition: "50% 40%",
    routes: ["/", "/organization"],
    disclaimer: "Stock photo for illustrative purposes. Subjects not affiliated with SolveSprint."
  },
  livePresentation: {
    id: "IMG-04_LIVE_PRESENTATION",
    src: "/images/editorial/live-presentation.webp",
    srcSet: "/images/editorial/live-presentation-640w.webp 640w, /images/editorial/live-presentation-960w.webp 960w, /images/editorial/live-presentation-1280w.webp 1280w, /images/editorial/live-presentation-1600w.webp 1600w",
    photographer: "Matheus Bertelli",
    sourceUrl: "https://www.pexels.com/photo/18999478/",
    alt: "Student pitching a solution to an audience and panel during live presentations",
    aspectRatio: "3 / 2",
    objectPosition: "50% 50%",
    routes: ["/", "/how-it-works"],
    disclaimer: "Stock photo for illustrative purposes. Subjects not affiliated with SolveSprint."
  },
  mentorReviewingWork: {
    id: "IMG-05_MENTOR_REVIEWING_WORK",
    src: "/images/editorial/mentor-reviewing-work.webp",
    srcSet: "/images/editorial/mentor-reviewing-work-640w.webp 640w, /images/editorial/mentor-reviewing-work-960w.webp 960w, /images/editorial/mentor-reviewing-work-1280w.webp 1280w, /images/editorial/mentor-reviewing-work-1600w.webp 1600w",
    photographer: "Alena Darmel",
    sourceUrl: "https://www.pexels.com/photo/7742820/",
    alt: "Event mentor reviewing project materials with student team members",
    aspectRatio: "3 / 2",
    objectPosition: "50% 30%",
    routes: ["/volunteer"],
    disclaimer: "Stock photo for illustrative purposes. Subjects not affiliated with SolveSprint."
  }
};

export function ApprovedPhoto({
  image,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className = "",
  aspectRatio,
}: {
  image: ApprovedImage;
  sizes?: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: string;
}) {
  const finalRatio = aspectRatio || image.aspectRatio;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: finalRatio }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        quality={82}
        className="object-cover"
        style={{ objectPosition: image.objectPosition }}
      />
    </div>
  );
}
