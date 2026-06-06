import fs from "fs";
import path from "path";
import { Destination } from "@/types/destination";

const DESTINATIONS_DIR = path.join(process.cwd(), "content", "destinations");

function readDestinationFile(filePath: string): Destination {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Destination;
}

export function getAllDestinations(): Destination[] {
  const destinations: Destination[] = [];
  const regions = fs.readdirSync(DESTINATIONS_DIR);
  for (const region of regions) {
    const regionPath = path.join(DESTINATIONS_DIR, region);
    if (!fs.statSync(regionPath).isDirectory()) continue;
    const files = fs.readdirSync(regionPath).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      destinations.push(readDestinationFile(path.join(regionPath, file)));
    }
  }
  return destinations;
}

export function getDestinationsByRegion(region: string): Destination[] {
  return getAllDestinations().filter((d) => d.region === region);
}

export function getDestinationBySlug(
  region: string,
  slug: string
): Destination | null {
  const filePath = path.join(DESTINATIONS_DIR, region, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return readDestinationFile(filePath);
}

export function getFeaturedDestinations(slugs: string[]): Destination[] {
  const all = getAllDestinations();
  return slugs
    .map((slug) => all.find((d) => d.slug === slug))
    .filter(Boolean) as Destination[];
}

export function generateDestinationStaticParams(): {
  region: string;
  slug: string;
}[] {
  return getAllDestinations().map((d) => ({ region: d.region, slug: d.slug }));
}
