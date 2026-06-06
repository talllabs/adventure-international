import Image from "next/image";
import Link from "next/link";
import { JournalFrontmatter } from "@/types/journal";
import { Clock, User } from "lucide-react";

interface JournalCardProps {
  article: JournalFrontmatter;
  variant?: "featured" | "standard";
}

export function JournalCard({ article, variant = "standard" }: JournalCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (variant === "featured") {
    return (
      <Link href={`/journal/${article.slug}`} className="group block">
        <div className="relative aspect-video overflow-hidden mb-6">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
            priority
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {article.themes.slice(0, 2).map((theme) => (
            <span key={theme} className="text-xs text-gold tracking-widest uppercase">{theme}</span>
          ))}
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-forest group-hover:text-gold transition-colors mb-3 font-light">
          {article.title}
        </h2>
        <p className="text-charcoal-soft leading-relaxed mb-4">{article.excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-charcoal-soft/60">
          <span className="flex items-center gap-1"><User size={12} />{article.author}</span>
          <span>{formattedDate}</span>
          <span className="flex items-center gap-1"><Clock size={12} />{article.readingTime} min read</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/journal/${article.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden mb-4">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {article.themes.slice(0, 1).map((theme) => (
          <span key={theme} className="text-xs text-gold tracking-widest uppercase">{theme}</span>
        ))}
      </div>
      <h3 className="font-serif text-xl text-forest group-hover:text-gold transition-colors mb-2 font-light">
        {article.title}
      </h3>
      <p className="text-sm text-charcoal-soft line-clamp-2">{article.excerpt}</p>
      <div className="flex items-center gap-3 text-xs text-charcoal-soft/50 mt-3">
        <span>{article.author}</span>
        <span>{article.readingTime} min read</span>
      </div>
    </Link>
  );
}
