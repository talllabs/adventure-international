import { Metadata } from "next";
import { getAllDestinations, getDestinationsByRegion } from "@/lib/content/destinations";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { RegionFilter } from "@/components/destinations/RegionFilter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

export const metadata: Metadata = {
  title: "Destinations | Adventure International",
  description: "Explore extraordinary destinations across Africa, Asia, South America, Central America, and Europe.",
};

interface DestinationsPageProps {
  searchParams: Promise<{ region?: string; country?: string }>;
}

export default async function DestinationsPage({ searchParams }: DestinationsPageProps) {
  const { region, country } = await searchParams;

  let destinations = await (region ? getDestinationsByRegion(region) : getAllDestinations());

  if (country) {
    destinations = destinations.filter((d) =>
      d.country.toLowerCase().includes(country.toLowerCase())
    );
  }

  const filterLabel = country
    ? country
    : region
    ? region.replace(/-/g, " ")
    : null;

  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="bg-[#0a0a0a] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <SectionLabel className="justify-center mb-6" light>
            Explore the World
          </SectionLabel>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light">
            {country ? country : "Our Destinations"}
          </h1>
        </div>
      </div>

      {/* Filter */}
      <RegionFilter activeRegion={region} activeCountry={country} />

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-white/60 text-sm mb-8">
          {destinations.length} destination{destinations.length !== 1 ? "s" : ""}
          {filterLabel ? ` in ${filterLabel}` : ""}
        </p>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <StaggerItem key={dest.slug}>
              <DestinationCard destination={dest} />
            </StaggerItem>
          ))}
        </StaggerChildren>
        {destinations.length === 0 && (
          <div className="text-center py-20 text-white/60">
            <p className="text-lg">No destinations found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
