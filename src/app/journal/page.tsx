import { Metadata } from "next";
import { getAllArticles } from "@/lib/content/journal";
import { JournalCard } from "@/components/journal/JournalCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Adventure Journal | Adventure International",
  description: "Stories, insights, and field notes from our expeditions around the world.",
};

export default async function JournalPage() {
  const articles = await getAllArticles();
  const [featured, ...rest] = articles;

  return (
    <div className="pt-24">
      <div className="bg-[#0a0a0a] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <SectionLabel className="justify-center mb-6" light>Stories from the Field</SectionLabel>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light">Adventure Journal</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {featured && (
          <div className="mb-16 pb-16 border-b border-white/10">
            <JournalCard article={featured} variant="featured" />
          </div>
        )}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {rest.map((article) => (
              <JournalCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
