import Image from "next/image";
import { SubBrand } from "@/types/subbrand";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { Button } from "@/components/ui/Button";

interface SubBrandPageProps {
  brand: SubBrand;
}

export function SubBrandPage({ brand }: SubBrandPageProps) {
  return (
    <div>
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src={brand.heroImage}
          alt={brand.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <h1 className="font-serif text-6xl md:text-8xl text-ivory font-light mb-4">{brand.name}</h1>
          <p className="text-ivory/70 text-base tracking-widest uppercase font-sans max-w-xl">{brand.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeInUp>
          <p className="text-lg text-white/60 leading-relaxed">{brand.description}</p>
          <div className="flex flex-wrap gap-2 mt-8">
            {brand.themes.map((theme) => (
              <span key={theme} className="border border-gold/40 text-gold px-4 py-1 text-xs tracking-widest uppercase">
                {theme}
              </span>
            ))}
          </div>
        </FadeInUp>
      </div>

      {/* Editorial Sections */}
      {brand.sections.map((section, idx) => (
        <div
          key={idx}
          className={`${idx % 2 === 0 ? "bg-[#111111]" : "bg-[#0a0a0a]"} py-20`}
        >
          <div
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
              idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <FadeInUp>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={section.image}
                  alt={section.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeInUp>
            <FadeInUp delay={0.15}>
              <SectionLabel className="mb-6">{section.label}</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-light mb-6">{section.headline}</h2>
              <p className="text-white/60 leading-relaxed text-lg">{section.body}</p>
            </FadeInUp>
          </div>
        </div>
      ))}

      <InquiryCTA />
    </div>
  );
}
