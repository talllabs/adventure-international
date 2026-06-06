import Image from "next/image";
import Link from "next/link";
import { Itinerary } from "@/types/itinerary";
import { Badge } from "@/components/ui/Badge";
import { Clock } from "lucide-react";

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export function ItineraryCard({ itinerary }: ItineraryCardProps) {
  return (
    <Link
      href={`/itineraries/${itinerary.slug}`}
      className="group block"
    >
      <div className="relative aspect-video overflow-hidden mb-4">
        <Image
          src={itinerary.heroImage}
          alt={itinerary.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="forest">
            <Clock size={10} className="mr-1" />
            {itinerary.duration} days
          </Badge>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {itinerary.themes.slice(0, 2).map((theme) => (
            <span key={theme} className="text-xs text-gold tracking-widest uppercase">{theme}</span>
          ))}
        </div>
        <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors mb-1">
          {itinerary.title}
        </h3>
        <p className="text-white/60 text-sm">{itinerary.subtitle}</p>
        {itinerary.priceFrom && (
          <p className="text-gold text-sm mt-2 font-sans">
            From ${itinerary.priceFrom.toLocaleString()}
          </p>
        )}
      </div>
    </Link>
  );
}
