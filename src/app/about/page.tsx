import { Metadata } from "next";
import fs from "fs";
import path from "path";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { Compass, Shield, Users, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Adventure International",
  description: "Born from a love of wild places — learn about the team and philosophy behind Adventure International.",
};

function getAboutData() {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "about.json"), "utf-8");
  return JSON.parse(raw);
}

const iconMap: Record<string, React.ElementType> = {
  compass: Compass,
  shield: Shield,
  users: Users,
  star: Star,
};

export default function AboutPage() {
  const data = getAboutData();

  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src={data.brandStory.image}
          alt="Adventure International Story"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <SectionLabel className="mb-4" light>Our Story</SectionLabel>
          <h1 className="font-serif text-5xl md:text-7xl text-ivory font-light">About Us</h1>
        </div>
      </div>

      {/* Brand Story */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeInUp>
          <h2 className="font-serif text-4xl text-forest font-light mb-8">{data.brandStory.headline}</h2>
          <p className="text-lg text-charcoal-soft leading-relaxed">{data.brandStory.body}</p>
        </FadeInUp>
      </div>

      {/* Expertise Pillars */}
      <div className="bg-ivory-warm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel className="mb-12">Our Philosophy</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.expertisePillars.map((pillar: {icon: string; title: string; description: string}, idx: number) => {
              const Icon = iconMap[pillar.icon] || Compass;
              return (
                <FadeInUp key={pillar.title} delay={idx * 0.1}>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-forest mb-3">{pillar.title}</h3>
                    <p className="text-charcoal-soft text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </FadeInUp>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel className="mb-12">Our Team</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.team.map((member: {name: string; role: string; bio: string; image: string; expertise: string[]}, idx: number) => (
              <FadeInUp key={member.name} delay={idx * 0.1}>
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-forest mb-1">{member.name}</h3>
                  <p className="text-gold text-xs tracking-widest uppercase mb-3">{member.role}</p>
                  <p className="text-charcoal-soft text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((exp: string) => (
                      <span key={exp} className="text-xs text-charcoal-soft/50 border border-charcoal/10 px-3 py-1">{exp}</span>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
