import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function InquiryCTA() {
  return (
    <section className="bg-[#0a0a0a] py-24 text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel className="justify-center mb-8" light>
          Begin Your Journey
        </SectionLabel>
        <h2 className="font-serif text-4xl md:text-6xl text-white font-light leading-tight mb-8">
          Every Great Expedition Starts With a Conversation
        </h2>
        <p className="text-white/60 text-lg mb-10 leading-relaxed">
          Our team of expedition specialists is ready to design your perfect journey. Tell us your dreams; we will handle everything else.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contact" variant="primary">
            Plan Your Journey
          </Button>
          <Button href="/itineraries" variant="secondary">
            View Itineraries
          </Button>
        </div>
      </div>
    </section>
  );
}
