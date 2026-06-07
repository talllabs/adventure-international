import { JournalFrontmatter, JournalArticle } from "@/types/journal";
import { fetchSheetRange, splitPipe, parseBool } from "@/lib/sheets";

// Columns: slug, title, subtitle, author, publishedAt, heroImage, excerpt,
//          destinations, themes, readingTime, featured, published
async function fetchArticles(): Promise<JournalFrontmatter[]> {
  const rows = await fetchSheetRange("Journal!A:L");

  return rows
    .filter((row) => parseBool(row[11]))
    .map((row) => {
      const [slug, title, subtitle, author, publishedAt, heroImage, excerpt, destinations, themes, readingTime, featured] = row;
      return {
        slug,
        title,
        subtitle,
        author,
        publishedAt,
        heroImage,
        excerpt,
        destinations: splitPipe(destinations),
        relatedItineraries: [],
        themes: splitPipe(themes),
        readingTime: parseInt(readingTime, 10) || 5,
        featured: parseBool(featured),
        meta: {
          title: `${title} | Adventure International Journal`,
          description: excerpt?.slice(0, 160) ?? "",
        },
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

let _cache: JournalFrontmatter[] | null = null;

async function getAll(): Promise<JournalFrontmatter[]> {
  if (_cache) return _cache;
  _cache = await fetchArticles();
  return _cache;
}

export async function getAllArticles(): Promise<JournalFrontmatter[]> {
  return getAll();
}

export async function getArticleBySlug(slug: string): Promise<JournalArticle | null> {
  const all = await getAll();
  const frontmatter = all.find((a) => a.slug === slug);
  if (!frontmatter) return null;
  // Content body now lives in the sheet's "body" column if added later;
  // for now return the excerpt as placeholder content
  return { frontmatter, content: frontmatter.excerpt };
}

export async function getFeaturedArticles(slugs: string[]): Promise<JournalFrontmatter[]> {
  const all = await getAll();
  return slugs.map((s) => all.find((a) => a.slug === s)).filter(Boolean) as JournalFrontmatter[];
}

export async function generateJournalStaticParams(): Promise<{ slug: string }[]> {
  const all = await getAll();
  return all.map((a) => ({ slug: a.slug }));
}
