import fs from "fs";
import path from "path";
import { Itinerary } from "@/types/itinerary";

const ITINERARIES_DIR = path.join(process.cwd(), "content", "itineraries");

export function getAllItineraries(): Itinerary[] {
  const files = fs
    .readdirSync(ITINERARIES_DIR)
    .filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(ITINERARIES_DIR, file), "utf-8");
    return JSON.parse(raw) as Itinerary;
  });
}

export function getItineraryBySlug(slug: string): Itinerary | null {
  const filePath = path.join(ITINERARIES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Itinerary;
}

export function getFeaturedItineraries(slugs: string[]): Itinerary[] {
  const all = getAllItineraries();
  return slugs
    .map((slug) => all.find((i) => i.slug === slug))
    .filter(Boolean) as Itinerary[];
}

export function generateItineraryStaticParams(): { slug: string }[] {
  return getAllItineraries().map((i) => ({ slug: i.slug }));
}
