import { Destination } from "@/types/destination";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

interface FeaturedDestinationsProps {
  destinations: Destination[];
}

export function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <SectionLabel className="mb-4">Destinations</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl text-[#111111] font-light">
              Extraordinary Places
            </h2>
          </div>
          <Button href="/destinations" variant="secondary" className="mt-6 md:mt-0">
            All Destinations
          </Button>
        </div>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <StaggerItem key={dest.slug}>
              <DestinationCard destination={dest} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
