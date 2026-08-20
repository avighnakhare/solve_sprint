/**
 * Approved Media Registry for SolveSprint
 * Enforces authorized images, license metadata, aspect ratios, and permitted routes.
 */

export interface ApprovedImage {
  key: string;
  src: string;
  photographer: string;
  sourceUrl: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: "landscape" | "portrait" | "wide";
  permittedRoutes: string[];
  responsiveVariants?: {
    w640: string;
    w960: string;
    w1280: string;
    w1600: string;
  };
}

export const APPROVED_IMAGES: Record<string, ApprovedImage> = {
  "students-collaborating": {
    key: "students-collaborating",
    src: "/images/editorial/students-collaborating.webp",
    photographer: "Max Fischer",
    sourceUrl: "https://www.pexels.com/photo/5212697/",
    alt: "Two high school students collaborating on a project using a laptop in a classroom setting",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    permittedRoutes: ["/", "/student"],
    responsiveVariants: {
      w640: "/images/editorial/students-collaborating-640w.webp",
      w960: "/images/editorial/students-collaborating-960w.webp",
      w1280: "/images/editorial/students-collaborating-1280w.webp",
      w1600: "/images/editorial/students-collaborating-1600w.webp",
    },
  },
  "classroom-hands-on": {
    key: "classroom-hands-on",
    src: "/images/editorial/classroom-hands-on.webp",
    photographer: "Asia Culture Center",
    sourceUrl: "https://www.pexels.com/photo/14382529/",
    alt: "Student engaging in hands-on work in a modern high-tech classroom setting",
    width: 1600,
    height: 1067,
    aspectRatio: "wide",
    permittedRoutes: ["/"],
    responsiveVariants: {
      w640: "/images/editorial/classroom-hands-on-640w.webp",
      w960: "/images/editorial/classroom-hands-on-960w.webp",
      w1280: "/images/editorial/classroom-hands-on-1280w.webp",
      w1600: "/images/editorial/classroom-hands-on-1600w.webp",
    },
  },
  "organization-whiteboard": {
    key: "organization-whiteboard",
    src: "/images/editorial/organization-whiteboard.webp",
    photographer: "Artem Podrez",
    sourceUrl: "https://www.pexels.com/photo/8518810/",
    alt: "Professional writing on a whiteboard during an organization planning meeting",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    permittedRoutes: ["/", "/organization"],
    responsiveVariants: {
      w640: "/images/editorial/organization-whiteboard-640w.webp",
      w960: "/images/editorial/organization-whiteboard-960w.webp",
      w1280: "/images/editorial/organization-whiteboard-1280w.webp",
      w1600: "/images/editorial/organization-whiteboard-1600w.webp",
    },
  },
  "live-presentation": {
    key: "live-presentation",
    src: "/images/editorial/live-presentation.webp",
    photographer: "Matheus Bertelli",
    sourceUrl: "https://www.pexels.com/photo/18999478/",
    alt: "Speaker addressing an engaged audience during a project presentation",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    permittedRoutes: ["/", "/how-it-works"],
    responsiveVariants: {
      w640: "/images/editorial/live-presentation-640w.webp",
      w960: "/images/editorial/live-presentation-960w.webp",
      w1280: "/images/editorial/live-presentation-1280w.webp",
      w1600: "/images/editorial/live-presentation-1600w.webp",
    },
  },
  "mentor-reviewing-work": {
    key: "mentor-reviewing-work",
    src: "/images/editorial/mentor-reviewing-work.webp",
    photographer: "Alena Darmel",
    sourceUrl: "https://www.pexels.com/photo/7742820/",
    alt: "Mentor reviewing student work with two team members on a laptop",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    permittedRoutes: ["/volunteer"],
    responsiveVariants: {
      w640: "/images/editorial/mentor-reviewing-work-640w.webp",
      w960: "/images/editorial/mentor-reviewing-work-960w.webp",
      w1280: "/images/editorial/mentor-reviewing-work-1280w.webp",
      w1600: "/images/editorial/mentor-reviewing-work-1600w.webp",
    },
  },
  "founder-avighna": {
    key: "founder-avighna",
    src: "/images/about/avighna-khare.png",
    photographer: "First-Party Portrait",
    sourceUrl: "First-Party",
    alt: "Avighna Khare, Co-Founder of SolveSprint",
    width: 600,
    height: 800,
    aspectRatio: "portrait",
    permittedRoutes: ["/", "/about"],
  },
  "founder-kavish": {
    key: "founder-kavish",
    src: "/images/about/kavish-shah.png",
    photographer: "First-Party Portrait",
    sourceUrl: "First-Party",
    alt: "Kavish Shah, Co-Founder of SolveSprint",
    width: 600,
    height: 800,
    aspectRatio: "portrait",
    permittedRoutes: ["/", "/about"],
  },
  "founder-siddhant": {
    key: "founder-siddhant",
    src: "/images/about/siddhant-gutgutia.png",
    photographer: "First-Party Portrait",
    sourceUrl: "First-Party",
    alt: "Siddhant Gutgutia, Co-Founder of SolveSprint",
    width: 600,
    height: 800,
    aspectRatio: "portrait",
    permittedRoutes: ["/", "/about"],
  },
};

export function getApprovedImage(key: string): ApprovedImage {
  const image = APPROVED_IMAGES[key];
  if (!image) {
    throw new Error(`[ApprovedMedia] Unapproved image key referenced: "${key}"`);
  }
  return image;
}
