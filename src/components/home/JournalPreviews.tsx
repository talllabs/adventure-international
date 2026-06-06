import { JournalFrontmatter } from "@/types/journal";
import { JournalCard } from "@/components/journal/JournalCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

interface JournalPreviewsProps {
  articles: JournalFrontmatter[];
}

export function JournalPreviews({ articles }: JournalPreviewsProps) {
  return (
    <section className="py-24 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <SectionLabel className="mb-4">Adventure Journal</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl text-[#111111] font-light">
              Stories From the Field
            </h2>
          </div>
          <Button href="/journal" variant="secondary" className="mt-6 md:mt-0">
            All Articles
          </Button>
        </div>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <StaggerItem key={article.slug}>
              <JournalCard article={article} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
