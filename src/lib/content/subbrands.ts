import { SubBrand } from "@/types/subbrand";
import { fetchSheetRange, splitPipe, parseBool } from "@/lib/sheets";

// Columns: slug, name, tagline, description, heroImage, themes, published
async function fetchSubBrands(): Promise<SubBrand[]> {
  const rows = await fetchSheetRange("SubBrands!A:G");

  return rows
    .filter((row) => parseBool(row[6]))
    .map((row) => {
      const [slug, name, tagline, description, heroImage, themes] = row;
      return {
        slug,
        name,
        tagline,
        description,
        heroImage,
        accentColor: "#c9a84c",
        themes: splitPipe(themes),
        featuredDestinations: [],
        featuredItineraries: [],
        sections: [],
        meta: {
          title: `${name} | Adventure International`,
          description: tagline ?? "",
        },
      };
    });
}

let _cache: SubBrand[] | null = null;

async function getAll(): Promise<SubBrand[]> {
  if (_cache) return _cache;
  _cache = await fetchSubBrands();
  return _cache;
}

export async function getAllSubBrands(): Promise<SubBrand[]> {
  return getAll();
}

export async function getSubBrand(slug: string): Promise<SubBrand | null> {
  const all = await getAll();
  return all.find((b) => b.slug === slug) ?? null;
}
