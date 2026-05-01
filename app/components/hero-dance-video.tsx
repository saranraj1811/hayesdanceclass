"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const MOBILE_QUERY = "(max-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function HeroDanceVideo() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const syncMediaFlags = () => {
      setIsMobileOrTablet(mobileQuery.matches);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    syncMediaFlags();
    mobileQuery.addEventListener("change", syncMediaFlags);
    reducedMotionQuery.addEventListener("change", syncMediaFlags);

    return () => {
      mobileQuery.removeEventListener("change", syncMediaFlags);
      reducedMotionQuery.removeEventListener("change", syncMediaFlags);
    };
  }, []);

  const showVideo = !isMobileOrTablet && !prefersReducedMotion && !videoFailed;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-slate-950/60 shadow-[0_20px_70px_rgba(14,116,144,0.25)]">
      <div className="relative aspect-video w-full">
        <Image
          src="/images/dance-hero-poster.svg"
          alt="Energetic dance stage lighting background"
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
          priority
        />
        {showVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/dance-hero-poster.svg"
            onError={() => setVideoFailed(true)}
            aria-label="Hero dance ambience video"
          >
            <source src="/videos/dance-hero.webm" type="video/webm" />
          </video>
        ) : null}
        <div className="hero-shimmer pointer-events-none absolute inset-0" />
      </div>
    </div>
  );
}
