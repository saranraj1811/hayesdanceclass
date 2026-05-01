import Image from "next/image";

export function HeroDanceImage() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/20 bg-[#1d0030] shadow-[0_30px_80px_rgba(217,70,239,0.3)]">
      <Image
        src="/images/hero-dance-comic.webp"
        alt="Kids and adults Bollywood dance class performance in Hayes, West London"
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-cover object-center"
        priority
      />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_45%,rgba(22,0,32,0.65)_100%)]"
        aria-hidden
      />

      <div className="hero-shimmer pointer-events-none absolute inset-0" aria-hidden />
    </div>
  );
}

export const HeroDanceVideo = HeroDanceImage;
