"use client";

import { useState } from "react";
import Link from "next/link";
import { NavMobile } from "./NavMobile";
import { Menu } from "lucide-react";

const NAV_LINKS = [
  {
    label: "Signature Expeditions",
    href: "/itineraries",
  },
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { label: "Africa", href: "/destinations?region=africa" },
      { label: "Asia", href: "/destinations?region=asia" },
      { label: "South America", href: "/destinations?region=south-america" },
      { label: "Central America", href: "/destinations?region=central-america" },
      { label: "Europe", href: "/destinations?region=europe" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/journal" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="text-white/80 hover:text-gold text-sm tracking-widest uppercase transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 w-56">
                    <div className="bg-black border border-gold/20 py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-white/70 hover:text-gold hover:bg-white/5 text-sm transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
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
