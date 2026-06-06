import { Metadata } from "next";
import homepageData from "../../content/homepage.json";
import { getFeaturedDestinations } from "@/lib/content/destinations";
import { getFeaturedItineraries } from "@/lib/content/itineraries";
import { getFeaturedArticles } from "@/lib/content/journal";
import { getAllSubBrands } from "@/lib/content/subbrands";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { ExperienceThemes } from "@/components/home/ExperienceThemes";
import { EditorialStory } from "@/components/home/EditorialStory";
import { SignatureItineraries } from "@/components/home/SignatureItineraries";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { JournalPreviews } from "@/components/home/JournalPreviews";
import { SubBrandStrip } from "@/components/home/SubBrandStrip";

export const metadata: Metadata = {
  title: "Adventure International — Adventures For A Lifetime",
  description:
    "Bespoke luxury expeditions, safaris, trekking, and wilderness journeys across Africa, Asia, South America, and beyond.",
};

export default function HomePage() {
  const destinations = getFeaturedDestinations(homepageData.featuredDestinations);
  const itineraries = getFeaturedItineraries(homepageData.signatureItineraries);
  const articles = getFeaturedArticles(homepageData.journalPreviews);
  const subBrands = getAllSubBrands().filter((b) =>
    homepageData.subBrands.includes(b.slug)
  );

  return (
    <>
      <HeroCinematic
        vimeoId={homepageData.hero.vimeoId}
        headline={homepageData.hero.headline}
        subheadline={homepageData.hero.subheadline}
        ctaLabel={homepageData.hero.ctaLabel}
        ctaHref={homepageData.hero.ctaHref}
      />
      <FeaturedDestinations destinations={destinations} />
      <ExperienceThemes themes={homepageData.experienceThemes} />
      <EditorialStory sections={homepageData.editorialSections} />
      <SignatureItineraries itineraries={itineraries} />
      <InquiryCTA />
      <JournalPreviews articles={articles} />
      <SubBrandStrip subBrands={subBrands} />
    </>
  );
}
