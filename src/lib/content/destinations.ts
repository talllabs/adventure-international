import { Destination, SignatureExperience } from "@/types/destination";
import { fetchSheetRange, splitPipe, parseBool } from "@/lib/sheets";

// Columns: slug, region, name, country, tagline, heroImage, intro,
//          themes, bestTimeToVisit, metaTitle, metaDescription, published
async function fetchDestinations(): Promise<Destination[]> {
  const [destRows, expRows] = await Promise.all([
    fetchSheetRange("Destinations!A:L"),
    fetchSheetRange("Experiences!A:C"),
  ]);

  // Build experiences lookup: destinationSlug → SignatureExperience[]
  const expMap: Record<string, SignatureExperience[]> = {};
  for (const [slug, title, description] of expRows) {
    if (!slug) continue;
    if (!expMap[slug]) expMap[slug] = [];
    expMap[slug].push({ title, description, icon: "" });
  }

  return destRows
    .filter(([, , , , , , , , , , , published]) => parseBool(published))
    .map(([slug, region, name, country, tagline, heroImage, intro, themes, bestTimeToVisit, metaTitle, metaDescription]) => ({
      slug,
      region,
      name,
      country,
      tagline,
      heroImage,
      galleryImages: [heroImage],
      intro,
      themes: splitPipe(themes),
      signatureExperiences: expMap[slug] ?? [],
      wildlifeHighlights: [],
      sampleItineraries: [],
      lodging: [],
      bestTimeToVisit,
      relatedDestinations: [],
      relatedJournalArticles: [],
      meta: { title: metaTitle, description: metaDescription },
    }));
}

// Cache within a single request/build cycle
let _cache: Destination[] | null = null;

async function getAll(): Promise<Destination[]> {
  if (_cache) return _cache;
  _cache = await fetchDestinations();
  return _cache;
}

export async function getAllDestinations(): Promise<Destination[]> {
  return getAll();
}

export async function getDestinationsByRegion(region: string): Promise<Destination[]> {
  const all = await getAll();
  return all.filter((d) => d.region === region);
}

export async function getDestinationBySlug(region: string, slug: string): Promise<Destination | null> {
  const all = await getAll();
  return all.find((d) => d.region === region && d.slug === slug) ?? null;
}

export async function getFeaturedDestinations(slugs: string[]): Promise<Destination[]> {
  const all = await getAll();
  return slugs.map((s) => all.find((d) => d.slug === s)).filter(Boolean) as Destination[];
}

export async function generateDestinationStaticParams(): Promise<{ region: string; slug: string }[]> {
  const all = await getAll();
  return all.map((d) => ({ region: d.region, slug: d.slug }));
}
