import Image from "next/image";

export interface FounderData {
  name: string;
  role: string;
  title: string;
  bio: string;
  imageSrc: string;
}

export function FounderProfile({ founder }: { founder: FounderData }) {
  return (
    <article className="flex flex-col space-y-4">
      {/* Photo Frame 3:4 desktop, 4:5 mobile */}
      <div className="relative overflow-hidden rounded-[20px] border-2 border-ink bg-white aspect-[4/5] sm:aspect-[3/4] shadow-[5px_5px_0px_0px_#F47731]">
        <Image
          src={founder.imageSrc}
          alt={`Portrait of ${founder.name}, ${founder.role} of SolveSprint`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 380px"
          className="object-cover"
        />
      </div>

      <div className="space-y-1">
        <h3 className="font-body font-bold text-xl sm:text-2xl text-ink">
          {founder.name}
        </h3>
        <p className="trail-label text-tangerine font-semibold">
          {founder.role} • {founder.title}
        </p>
        <p className="body-standard text-ink-muted pt-1">
          {founder.bio}
        </p>
      </div>
    </article>
  );
}
