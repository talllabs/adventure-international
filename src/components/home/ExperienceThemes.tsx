import Link from "next/link";

interface ExperienceThemesProps {
  themes: string[];
}

export function ExperienceThemes({ themes }: ExperienceThemesProps) {
  return (
    <section className="bg-forest py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {themes.map((theme) => (
            <Link
              key={theme}
              href={`/destinations?theme=${encodeURIComponent(theme)}`}
              className="border border-gold/40 text-gold/80 hover:border-gold hover:text-gold px-5 py-2 text-xs tracking-widest uppercase transition-colors font-sans"
            >
              {theme}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
