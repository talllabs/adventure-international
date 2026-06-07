import { Itinerary } from "@/types/itinerary";
import { fetchSheetRange, splitPipe, parseBool } from "@/lib/sheets";

// Columns: slug, title, subtitle, duration, groupSize, physicalRating,
//          overview, heroImage, priceFrom, themes, destinationSlugs, highlights, published
async function fetchItineraries(): Promise<Itinerary[]> {
  const rows = await fetchSheetRange("Itineraries!A:M");

  return rows
    .filter((row) => parseBool(row[12]))
    .map((row) => {
      const [slug, title, subtitle, duration, groupSize, physicalRating, overview, heroImage, priceFrom, themes, destinationSlugs, highlights] = row;
      return {
        slug,
        title,
        subtitle,
        heroImage,
        galleryImages: [heroImage],
        destinations: splitPipe(destinationSlugs),
        themes: splitPipe(themes),
        overview,
        duration: parseInt(duration, 10) || 0,
        groupSize,
        physicalRating,
        highlights: splitPipe(highlights),
        routeMapImage: "",
        days: [],
        accommodations: [],
        inclusions: [],
        exclusions: [],
        priceFrom: parseInt(priceFrom, 10) || 0,
        featured: true,
        relatedJourneys: [],
        meta: {
          title: `${title} | Adventure International`,
          description: overview?.slice(0, 160) ?? "",
        },
      };
    });
}

let _cache: Itinerary[] | null = null;

async function getAll(): Promise<Itinerary[]> {
  if (_cache) return _cache;
  _cache = await fetchItineraries();
  return _cache;
}

export async function getAllItineraries(): Promise<Itinerary[]> {
  return getAll();
}

export async function getItineraryBySlug(slug: string): Promise<Itinerary | null> {
  const all = await getAll();
  return all.find((i) => i.slug === slug) ?? null;
}

export async function getFeaturedItineraries(slugs: string[]): Promise<Itinerary[]> {
  const all = await getAll();
  return slugs.map((s) => all.find((i) => i.slug === s)).filter(Boolean) as Itinerary[];
}

export async function generateItineraryStaticParams(): Promise<{ slug: string }[]> {
  const all = await getAll();
  return all.map((i) => ({ slug: i.slug }));
}
