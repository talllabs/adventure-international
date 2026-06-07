import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, generateJournalStaticParams, getAllArticles } from "@/lib/content/journal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { Clock, User, Calendar } from "lucide-react";
import { JournalCard } from "@/components/journal/JournalCard";
import { ReactNode } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateJournalStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.frontmatter.meta.title,
    description: article.frontmatter.meta.description,
  };
}

const mdxComponents = {
  PullQuote: ({ children }: { children: ReactNode }) => (
    <div className="my-10 py-6 px-8 border-l-4 border-gold text-2xl font-serif text-white italic leading-relaxed">
      {children}
    </div>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="my-6 pl-6 border-l-4 border-gold italic text-white/60">
      {children}
    </blockquote>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="font-serif text-3xl text-white mt-10 mb-4 font-light">{children}</h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="font-serif text-2xl text-white mt-8 mb-3 font-light">{children}</h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-white/70 leading-relaxed mb-5 text-lg">{children}</p>
  ),
};

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter, content } = article;
  const allArticles = await getAllArticles();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  const formattedDate = new Date(frontmatter.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={frontmatter.heroImage}
          alt={frontmatter.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pt-32">
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.themes.map((theme) => (
              <Badge key={theme} variant="gold">{theme}</Badge>
            ))}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-light mb-3 max-w-4xl">
            {frontmatter.title}
          </h1>
          <p className="text-white/70 text-lg mb-6 max-w-2xl">{frontmatter.subtitle}</p>
          <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm">
            <span className="flex items-center gap-2"><User size={14} />{frontmatter.author}</span>
            <span className="flex items-center gap-2"><Calendar size={14} />{formattedDate}</span>
            <span className="flex items-center gap-2"><Clock size={14} />{frontmatter.readingTime} min read</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="bg-[#111111] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLabel className="mb-10" light>More from the Journal</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((a) => (
                <JournalCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
