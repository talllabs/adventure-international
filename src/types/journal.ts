export interface JournalMeta {
  title: string;
  description: string;
}

export interface JournalFrontmatter {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  publishedAt: string;
  heroImage: string;
  excerpt: string;
  destinations: string[];
  relatedItineraries: string[];
  themes: string[];
  readingTime: number;
  featured: boolean;
  meta: JournalMeta;
}

export interface JournalArticle {
  frontmatter: JournalFrontmatter;
  content: string;
}
