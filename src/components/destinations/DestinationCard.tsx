import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/types/destination";
import { Badge } from "@/components/ui/Badge";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.region}/${destination.slug}`}
      className="group block relative aspect-[3/4] overflow-hidden"
    >
      <Image
        src={destination.heroImage}
        alt={destination.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute top-4 left-4">
        <Badge variant="forest">{destination.region}</Badge>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-white/60 text-xs tracking-widest uppercase mb-1">{destination.country}</p>
        <h3 className="font-serif text-white text-2xl font-light leading-tight mb-1">
          {destination.name}
        </h3>
        <p className="text-white/70 text-sm leading-snug line-clamp-2">{destination.tagline}</p>
      </div>
    </Link>
  );
}
