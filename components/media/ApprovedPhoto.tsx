import Image from "next/image";
import { type ApprovedImage } from "./approved-media";

interface ApprovedPhotoProps {
  image: ApprovedImage;
  priority?: boolean;
  className?: string;
  sizes?: string;
  altOverride?: string;
}

export function ApprovedPhoto({
  image,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  altOverride,
}: ApprovedPhotoProps) {
  return (
    <Image
      src={image.src}
      alt={altOverride || image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      sizes={sizes}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
