"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

interface NavMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavMobile({ isOpen, onClose }: NavMobileProps) {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Link href="/" onClick={onClose}>
              <img
                src="https://adventure-international.com/wp-content/uploads/2018/07/ADVENTURE-INTERNATIONAL-logo.svg"
                alt="Adventure International"
                className="h-8 w-auto"
              />
            </Link>
            <button onClick={onClose} className="text-white" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8">
            {NAV_LINKS.map((link) => (
              <div key={link.href} className="mb-6">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block text-2xl font-serif text-white hover:text-gold transition-colors mb-3"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 border-l border-white/10 space-y-1">
                    {link.children.map((child) => {
                      const hasCountries = "countries" in child && child.countries?.length;
                      return (
                        <div key={child.href}>
                          <div className="flex items-center justify-between">
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="flex-1 text-white/60 hover:text-gold text-sm tracking-wide transition-colors py-1"
                            >
                              {child.label}
                            </Link>
                            {hasCountries && (
                              <button
                                onClick={() => setExpandedRegion(expandedRegion === child.label ? null : child.label)}
                                className="p-1 text-white/40"
                                aria-label="Expand"
                              >
                                <ChevronDown
                                  size={14}
                                  className={`transition-transform ${expandedRegion === child.label ? "rotate-180" : ""}`}
                                />
                              </button>
                            )}
                          </div>
                          {hasCountries && expandedRegion === child.label && (
                            <div className="pl-3 border-l border-gold/20 mt-1 mb-2 space-y-1">
                              {"countries" in child && child.countries?.map((country) => (
                                <Link
                                  key={country.href}
                                  href={country.href}
                                  onClick={onClose}
                                  className="block text-white/40 hover:text-gold text-xs tracking-wide transition-colors py-1"
                                >
                                  {country.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="px-6 py-6 border-t border-white/10">
            <Button href="/contact" variant="primary" className="w-full justify-center" onClick={onClose}>
              Plan Your Journey
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
