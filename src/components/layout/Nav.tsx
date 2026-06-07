"use client";

import { useState } from "react";
import Link from "next/link";
import { NavMobile } from "./NavMobile";
import { Menu, ChevronRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="https://adventure-international.com/wp-content/uploads/2018/07/ADVENTURE-INTERNATIONAL-logo.svg"
              alt="Adventure International"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => { link.children && setActiveDropdown(link.label); setActiveRegion(null); }}
                onMouseLeave={() => { setActiveDropdown(null); setActiveRegion(null); }}
              >
                <Link
                  href={link.href}
                  className="text-white/80 hover:text-gold text-sm tracking-widest uppercase transition-colors"
                >
                  {link.label}
                </Link>

                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 flex">
                    {/* Region column */}
                    <div className="bg-black border border-gold/20 py-2 w-52">
                      {link.children.map((child) => (
                        <div
                          key={child.href}
                          onMouseEnter={() => "countries" in child && child.countries?.length ? setActiveRegion(child.label) : setActiveRegion(null)}
                          className="flex items-center justify-between"
                        >
                          <Link
                            href={child.href}
                            className="flex-1 block px-4 py-2 text-white/70 hover:text-gold hover:bg-white/5 text-sm transition-colors"
                          >
                            {child.label}
                          </Link>
                          {"countries" in child && child.countries?.length ? (
                            <ChevronRight size={12} className="text-white/30 mr-3" />
                          ) : null}
                        </div>
                      ))}
                    </div>

                    {/* Country column */}
                    {activeRegion && (() => {
                      const region = link.children?.find((c) => c.label === activeRegion);
                      const countries = region && "countries" in region ? region.countries : null;
                      if (!countries?.length) return null;
                      return (
                        <div className="bg-black border border-l-0 border-gold/20 py-2 w-52">
                          {countries.map((country) => (
                            <Link
                              key={country.href}
                              href={country.href}
                              className="block px-4 py-2 text-white/70 hover:text-gold hover:bg-white/5 text-sm transition-colors"
                            >
                              {country.label}
                            </Link>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <NavMobile isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
