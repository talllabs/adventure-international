import { Metadata } from "next";
import fs from "fs";
import path from "path";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInUp } from "@/components/motion/FadeInUp";

export const metadata: Metadata = {
  title: "About | Adventure International",
  description: "A small team of adventure specialists delivering private luxury expeditions to the world's most extraordinary places.",
};

function getAboutData() {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "about.json"), "utf-8");
  return JSON.parse(raw);
}

export default function AboutPage() {
  const data = getAboutData();

  return (
    <div className="pt-24 bg-black text-white">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1589308701970-9cd89ef0b77c?w=1600"
          alt="Mount Kilimanjaro"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <SectionLabel className="mb-4" light>Our Story</SectionLabel>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light">About Us</h1>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeInUp>
          <h2 className="font-serif text-4xl text-white font-light mb-8">{data.headline}</h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8">{data.intro}</p>
          <p className="text-lg text-white/70 leading-relaxed">{data.philosophy}</p>
        </FadeInUp>
      </div>

      {/* Expertise Pillars */}
      <div className="bg-white/5 border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel className="mb-12" light>Why AI</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.expertisePillars.map((pillar: { title: string; body: string }, idx: number) => (
              <FadeInUp key={pillar.title} delay={idx * 0.1}>
                <div className="border border-gold/30 p-6">
                  <h3 className="font-serif text-xl text-gold mb-3">{pillar.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{pillar.body}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      {data.testimonial && (
        <div className="py-20 border-t border-white/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInUp>
              <blockquote className="font-serif text-2xl text-white/80 font-light italic leading-relaxed mb-6">
                &ldquo;{data.testimonial.quote}&rdquo;
              </blockquote>
              <p className="text-gold text-xs tracking-widest uppercase">— {data.testimonial.attribution}</p>
            </FadeInUp>
          </div>
        </div>
      )}

      {/* Team */}
      <div className="py-20 bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel className="mb-12" light>Our Team</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {data.team.map((member: { name: string; role: string; bio: string; image: string }, idx: number) => (
              <FadeInUp key={member.name} delay={idx * 0.1}>
                <div className="flex gap-8">
                  <div className="relative w-32 h-40 flex-shrink-0 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-white mb-1">{member.name}</h3>
                    <p className="text-gold text-xs tracking-widest uppercase mb-4">{member.role}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>

      {/* Why Us */}
      <div className="py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <SectionLabel className="mb-8" light>Why Adventure International</SectionLabel>
            <p className="text-lg text-white/70 leading-relaxed">{data.whyUs}</p>
          </FadeInUp>
        </div>
      </div>
    </div>
  );
}
