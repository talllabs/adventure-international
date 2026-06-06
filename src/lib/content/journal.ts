import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { JournalFrontmatter, JournalArticle } from "@/types/journal";

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");

export function getAllArticles(): JournalFrontmatter[] {
  const files = fs
    .readdirSync(JOURNAL_DIR)
    .filter((f) => f.endsWith(".mdx"));
  const articles = files.map((file) => {
    const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), "utf-8");
    const { data } = matter(raw);
    return data as JournalFrontmatter;
  });
  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): JournalArticle | null {
  const filePath = path.join(JOURNAL_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as JournalFrontmatter,
    content,
  };
}

export function getFeaturedArticles(slugs: string[]): JournalFrontmatter[] {
  const all = getAllArticles();
  return slugs
    .map((slug) => all.find((a) => a.slug === slug))
    .filter(Boolean) as JournalFrontmatter[];
}

export function generateJournalStaticParams(): { slug: string }[] {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}
