import Image from "next/image";

export function HeroDanceImage() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/20 bg-[#1d0030] shadow-[0_30px_80px_rgba(217,70,239,0.25)] sm:aspect-[5/4] lg:aspect-[6/5]">
      <Image
        src="/images/dance-hero-poster.svg"
        alt="Vibrant stage lighting glow background"
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-cover"
        priority
      />

      <Image
        src="/images/dance-kids.svg"
        alt="Stylised young dancers in vibrant Bollywood costumes"
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-contain object-bottom"
        priority
      />

      <div className="absolute inset-x-[8%] bottom-[6%] aspect-[3/2]">
        <Image
          src="/images/dance-adults.svg"
          alt="Stylised adult dancers performing classical fusion"
          fill
          sizes="(max-width: 1024px) 92vw, 50vw"
          className="object-contain object-bottom"
        />
      </div>

      <div className="hero-shimmer pointer-events-none absolute inset-0" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(236,72,153,0.35),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(255,122,24,0.3),transparent_55%)]"
        aria-hidden
      />
    </div>
  );
}

export const HeroDanceVideo = HeroDanceImage;
