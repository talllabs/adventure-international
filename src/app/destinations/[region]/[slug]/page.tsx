import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDestinationBySlug, generateDestinationStaticParams, getAllDestinations } from "@/lib/content/destinations";
import { getItineraryBySlug } from "@/lib/content/itineraries";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { FadeInUp } from "@/components/motion/FadeInUp";

interface Props {
  params: Promise<{ region: string; slug: string }>;
}

export async function generateStaticParams() {
  return generateDestinationStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, slug } = await params;
  const dest = getDestinationBySlug(region, slug);
  if (!dest) return {};
  return { title: dest.meta.title, description: dest.meta.description };
}

export default async function DestinationPage({ params }: Props) {
  const { region, slug } = await params;
  const dest = getDestinationBySlug(region, slug);
  if (!dest) notFound();

  const itineraries = dest.sampleItineraries
    .map((s) => getItineraryBySlug(s))
    .filter(Boolean);

  const allDests = getAllDestinations();
  const related = dest.relatedDestinations
    .map((s) => allDests.find((d) => d.slug === s))
    .filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src={dest.heroImage}
          alt={dest.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
            <Link href="/destinations" className="hover:text-gold">Destinations</Link>
            <span>/</span>
            <Link href={`/destinations?region=${dest.region}`} className="hover:text-gold capitalize">{dest.region.replace("-", " ")}</Link>
            <span>/</span>
            <span className="text-white">{dest.name}</span>
          </nav>
          <Badge variant="forest" className="mb-4">{dest.country}</Badge>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light mb-4">{dest.name}</h1>
          <p className="text-white/70 text-lg max-w-2xl">{dest.tagline}</p>
        </div>
      </div>

      {/* Intro */}
      <FadeInUp>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <SectionLabel className="mb-6">About This Destination</SectionLabel>
          <p className="text-lg text-charcoal-soft leading-relaxed">{dest.intro}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {dest.themes.map((theme) => (
              <Badge key={theme} variant="gold">{theme}</Badge>
            ))}
          </div>
        </div>
      </FadeInUp>

      {/* Signature Experiences */}
      <div className="bg-ivory-warm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel className="mb-8">Signature Experiences</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dest.signatureExperiences.map((exp) => (
              <FadeInUp key={exp.title} delay={0.1}>
                <div className="border border-ivory-deep p-8 bg-ivory">
                  <h3 className="font-serif text-xl text-forest mb-3">{exp.title}</h3>
                  <p className="text-charcoal-soft leading-relaxed">{exp.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>

      {/* Wildlife */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel className="mb-8">Wildlife Highlights</SectionLabel>
          <div className="space-y-4">
            {dest.wildlifeHighlights.map((wl) => (
              <div key={wl.species} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border border-ivory-deep bg-ivory-warm">
                <div>
                  <h4 className="font-serif text-lg text-forest">{wl.species}</h4>
                </div>
                <div>
                  <p className="text-xs text-gold tracking-widest uppercase mb-1">Best Season</p>
                  <p className="text-charcoal-soft text-sm">{wl.bestSeason}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal-soft/60 tracking-widest uppercase mb-1">Notes</p>
                  <p className="text-charcoal-soft text-sm">{wl.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sample Itineraries */}
      {itineraries.length > 0 && (
        <div className="bg-forest py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel className="mb-8" light>Itineraries</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {itineraries.map((itin) => itin && (
                <Link key={itin.slug} href={`/itineraries/${itin.slug}`} className="group border border-gold/20 p-8 hover:border-gold transition-colors">
                  <h3 className="font-serif text-2xl text-ivory group-hover:text-gold transition-colors mb-2">{itin.title}</h3>
                  <p className="text-ivory/60 text-sm mb-4">{itin.subtitle}</p>
                  <p className="text-gold text-sm">{itin.duration} days from ${itin.priceFrom.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lodging */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel className="mb-8">Where to Stay</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dest.lodging.map((lodge) => (
              <div key={lodge.name} className="group overflow-hidden border border-ivory-deep">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={lodge.image}
                    alt={lodge.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="gold" className="mb-3">{lodge.category}</Badge>
                  <h3 className="font-serif text-xl text-forest mb-2">{lodge.name}</h3>
                  <p className="text-charcoal-soft text-sm leading-relaxed">{lodge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best Time */}
      <div className="bg-ivory-warm py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gold tracking-widest uppercase mb-3">Best Time to Visit</p>
          <p className="font-serif text-xl text-forest">{dest.bestTimeToVisit}</p>
        </div>
      </div>

      <InquiryCTA />

      {/* Related */}
      {related.length > 0 && (
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel className="mb-8">Related Destinations</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => r && (
                <Link key={r.slug} href={`/destinations/${r.region}/${r.slug}`} className="group block relative aspect-[3/4] overflow-hidden">
                  <Image src={r.heroImage} alt={r.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-ivory text-xl">{r.name}</h3>
                    <p className="text-ivory/60 text-sm">{r.country}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
