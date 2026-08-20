import { ApprovedPhoto } from "@/components/media/ApprovedPhoto";
import { type ApprovedImage } from "@/components/media/approved-media";

export interface PhotoFrameProps {
  image: ApprovedImage;
  aspect?: "landscape" | "portrait" | "wide";
  priority?: boolean;
  caption?: boolean;
  captionText?: string;
  className?: string;
  sizes?: string;
}

export function PhotoFrame({
  image,
  aspect = "landscape",
  priority = false,
  caption = false,
  captionText,
  className = "",
  sizes,
}: PhotoFrameProps) {
  const aspectClasses = {
    landscape: "aspect-[3/2]",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/9]",
  }[aspect || image.aspectRatio];

  return (
    <figure className={`relative group ${className}`}>
      {/* Outer Photo Frame with clean 2px ink border & shadow */}
      <div
        className={`relative overflow-hidden rounded-[20px] bg-white border-2 border-ink shadow-[4px_4px_0px_0px_#233047] ${aspectClasses} photo-reveal`}
      >
        <ApprovedPhoto image={image} priority={priority} sizes={sizes} />
      </div>

      {/* Caption under photo */}
      {caption && (
        <figcaption className="mt-3 text-center sm:text-left">
          <p className="trail-label text-ink-muted">
            {captionText || `${image.key.toUpperCase().replace(/-/g, " ")} • ${image.photographer}`}
          </p>
        </figcaption>
      )}
    </figure>
  );
}
