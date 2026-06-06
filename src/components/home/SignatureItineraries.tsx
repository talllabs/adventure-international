import { Itinerary } from "@/types/itinerary";
import { ItineraryCard } from "@/components/itineraries/ItineraryCard";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

interface SignatureItinerariesProps {
  itineraries: Itinerary[];
}

export function SignatureItineraries({ itineraries }: SignatureItinerariesProps) {
  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <SectionLabel className="mb-4">Signature Journeys</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-light">
              Meticulously Crafted Itineraries
            </h2>
          </div>
          <Button href="/itineraries" variant="secondary" className="mt-6 md:mt-0">
            All Itineraries
          </Button>
        </div>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {itineraries.map((itinerary) => (
            <StaggerItem key={itinerary.slug}>
              <ItineraryCard itinerary={itinerary} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
