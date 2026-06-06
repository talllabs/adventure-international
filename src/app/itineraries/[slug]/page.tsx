import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getItineraryBySlug, generateItineraryStaticParams, getAllItineraries } from "@/lib/content/itineraries";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { CheckCircle, XCircle, Users, Clock, Activity } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateItineraryStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const itin = getItineraryBySlug(slug);
  if (!itin) return {};
  return { title: itin.meta.title, description: itin.meta.description };
}

export default async function ItineraryPage({ params }: Props) {
  const { slug } = await params;
  const itin = getItineraryBySlug(slug);
  if (!itin) notFound();

  const allItins = getAllItineraries();
  const related = itin.relatedJourneys
    .map((s) => allItins.find((i) => i.slug === s))
    .filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src={itin.heroImage}
          alt={itin.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <div className="flex flex-wrap gap-2 mb-4">
            {itin.themes.map((theme) => (
              <Badge key={theme} variant="gold">{theme}</Badge>
            ))}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light mb-3">{itin.title}</h1>
          <p className="text-white/70 text-lg">{itin.subtitle}</p>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="bg-[#111111] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock size={20} className="text-gold" />
              <p className="text-xs tracking-widest uppercase text-white/50">Duration</p>
              <p className="font-serif text-lg">{itin.duration} Days</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Users size={20} className="text-gold" />
              <p className="text-xs tracking-widest uppercase text-white/50">Group Size</p>
              <p className="font-serif text-lg">{itin.groupSize}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Activity size={20} className="text-gold" />
              <p className="text-xs tracking-widest uppercase text-white/50">Physical Rating</p>
              <p className="font-serif text-lg">{itin.physicalRating}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-gold text-xl font-sans font-semibold">${itin.priceFrom.toLocaleString()}+</p>
              <p className="text-xs tracking-widest uppercase text-white/50">Price From</p>
              <Button href="/contact" variant="primary" className="text-xs mt-1">Enquire</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview + Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeInUp>
            <SectionLabel className="mb-6">Overview</SectionLabel>
            <p className="text-lg text-white/60 leading-relaxed">{itin.overview}</p>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <SectionLabel className="mb-6">Highlights</SectionLabel>
            <ul className="space-y-3">
              {itin.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-white/60">{h}</span>
                </li>
              ))}
            </ul>
          </FadeInUp>
        </div>
      </div>

      {/* Day by Day */}
      <div className="bg-[#111111] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel className="mb-12" light>Day By Day</SectionLabel>
          <div className="space-y-8">
            {itin.days.map((day) => (
              <FadeInUp key={day.day} delay={0.05}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black font-sans font-semibold text-sm flex-shrink-0">
                      {day.day}
                    </div>
                    <div className="w-px flex-1 bg-gold/20 mt-2" />
                  </div>
                  <div className="pb-8 flex-1">
                    <p className="text-xs text-gold tracking-widest uppercase mb-1">{day.location}</p>
                    <h3 className="font-serif text-xl text-white mb-3">{day.title}</h3>
                    <p className="text-white/60 leading-relaxed">{day.description}</p>
                    {day.image && (
                      <div className="relative aspect-video mt-4 overflow-hidden">
                        <Image src={day.image} alt={day.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                    )}
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>

      {/* Accommodations */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel className="mb-10">Accommodation</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itin.accommodations.map((acc) => (
              <div key={acc.name} className="border border-white/10 overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={acc.image} alt={acc.name} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="p-6">
                  <Badge variant="gold" className="mb-3">{acc.category}</Badge>
                  <h3 className="font-serif text-xl text-white mb-1">{acc.name}</h3>
                  <p className="text-white/50 text-sm">{acc.location} — {acc.nights} night{acc.nights !== 1 ? "s" : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inclusions/Exclusions */}
      <div className="bg-[#0a0a0a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-2xl text-white mb-6">Included</h3>
              <ul className="space-y-3">
                {itin.inclusions.map((inc) => (
                  <li key={inc} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-white mb-6">Not Included</h3>
              <ul className="space-y-3">
                {itin.exclusions.map((exc) => (
                  <li key={exc} className="flex items-start gap-3">
                    <XCircle size={16} className="text-white/30 flex-shrink-0 mt-0.5" />
                    <span className="text-white/50 text-sm">{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <InquiryCTA />

      {/* Related */}
      {related.length > 0 && (
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel className="mb-10">Related Journeys</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((r) => r && (
                <Link key={r.slug} href={`/itineraries/${r.slug}`} className="group block">
                  <div className="relative aspect-video overflow-hidden mb-4">
                    <Image src={r.heroImage} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  </div>
                  <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">{r.title}</h3>
                  <p className="text-white/50 text-sm">{r.duration} days</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
