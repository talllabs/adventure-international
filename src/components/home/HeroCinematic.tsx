"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface HeroCinematicProps {
  vimeoId: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
}

export function HeroCinematic({
  vimeoId,
  headline,
  subheadline,
  ctaLabel,
  ctaHref,
}: HeroCinematicProps) {
  return (
    <section className="relative h-[100dvh] overflow-hidden">
      {/* Vimeo Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&quality=1080p`}
          className="absolute w-[177.78vh] h-[56.25vw] min-w-full min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ pointerEvents: "none" }}
          allow="autoplay; fullscreen"
          title="Hero video background"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-[#0a0a0a]/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <SectionLabel className="justify-center mb-8" light>
          Adventure International
        </SectionLabel>
        <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-wide mb-6 max-w-5xl">
          {headline}
        </h1>
        <p className="text-white/70 text-sm md:text-base tracking-widest uppercase font-sans mb-10 max-w-xl">
          {subheadline}
        </p>
        <Button href={ctaHref} variant="primary">
          {ctaLabel}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="text-white/60" size={28} />
      </div>
    </section>
  );
}
