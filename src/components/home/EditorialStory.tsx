import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInUp } from "@/components/motion/FadeInUp";

interface EditorialSection {
  label: string;
  headline: string;
  body: string;
  image: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface EditorialStoryProps {
  sections: EditorialSection[];
}

export function EditorialStory({ sections }: EditorialStoryProps) {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 last:mb-0 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
            index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <FadeInUp delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div className="max-w-lg">
              <SectionLabel className="mb-6">{section.label}</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 font-light leading-tight">
                {section.headline}
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 text-lg">
                {section.body}
              </p>
              {section.ctaLabel && section.ctaHref && (
                <Button href={section.ctaHref} variant="secondary">
                  {section.ctaLabel}
                </Button>
              )}
            </div>
          </FadeInUp>
        </div>
      ))}
    </section>
  );
}
