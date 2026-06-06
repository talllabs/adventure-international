import Link from "next/link";
import { REGIONS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-forest-dark text-ivory/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <div className="font-serif text-ivory text-2xl leading-none tracking-wider">Adventure</div>
              <div className="font-serif text-gold text-2xl leading-none tracking-widest">International</div>
            </div>
            <p className="text-sm leading-relaxed text-ivory/50">
              Bespoke luxury expeditions to the world&apos;s most extraordinary wild places.
            </p>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gold mb-4">Destinations</h4>
            <ul className="space-y-2">
              {REGIONS.map((r) => (
                <li key={r.value}>
                  <Link href={`/destinations?region=${r.value}`} className="text-sm hover:text-gold transition-colors">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gold mb-4">Experiences</h4>
            <ul className="space-y-2">
              {["Itineraries", "Journal", "About", "Contact"].map((label) => (
                <li key={label}>
                  <Link href={`/${label.toLowerCase()}`} className="text-sm hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sub-Brands */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gold mb-4">Our Brands</h4>
            <ul className="space-y-2">
              {[
                { label: "California Journeys", href: "/california-journeys" },
                { label: "Northern Journeys", href: "/northern-journeys" },
                { label: "Luxsurf", href: "/luxsurf" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-forest-light/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/30">
            &copy; {new Date().getFullYear()} Adventure International. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms", "Cookie Policy"].map((label) => (
              <Link key={label} href="#" className="text-xs text-ivory/30 hover:text-gold transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
