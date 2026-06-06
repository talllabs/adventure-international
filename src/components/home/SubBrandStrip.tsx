import Link from "next/link";
import { SubBrand } from "@/types/subbrand";

interface SubBrandStripProps {
  subBrands: SubBrand[];
}

export function SubBrandStrip({ subBrands }: SubBrandStripProps) {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-gold font-sans mb-3">Our Portfolio</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-light">
            Specialised Brands for Every Journey
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subBrands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/${brand.slug}`}
              className="group border border-white/10 hover:border-gold p-8 transition-all duration-300 bg-[#111111] hover:bg-[#1a1a1a]"
            >
              <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-gold transition-colors">
                {brand.name}
              </h3>
              <p className="text-xs tracking-widest uppercase text-white/40 mb-4">{brand.tagline}</p>
              <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{brand.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
