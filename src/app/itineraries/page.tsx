import { Metadata } from "next";
import { getAllItineraries } from "@/lib/content/itineraries";
import { ItineraryCard } from "@/components/itineraries/ItineraryCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

export const metadata: Metadata = {
  title: "Itineraries | Adventure International",
  description: "Explore our signature itineraries — expertly crafted journeys to the world's most extraordinary destinations.",
};

export default async function ItinerariesPage() {
  const itineraries = await getAllItineraries();

  return (
    <div className="pt-24">
      <div className="bg-[#0a0a0a] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <SectionLabel className="justify-center mb-6" light>
            Signature Journeys
          </SectionLabel>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light">
            Our Itineraries
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {itineraries.map((itin) => (
            <StaggerItem key={itin.slug}>
              <ItineraryCard itinerary={itin} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
}
