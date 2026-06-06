"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

interface NavMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavMobile({ isOpen, onClose }: NavMobileProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-forest-dark flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-forest-light">
            <Link href="/" onClick={onClose}>
              <span className="font-serif text-ivory text-xl">Adventure International</span>
            </Link>
            <button onClick={onClose} className="text-ivory" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8">
            {NAV_LINKS.map((link) => (
              <div key={link.href} className="mb-6">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block text-2xl font-serif text-ivory hover:text-gold transition-colors mb-3"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 border-l border-forest-light space-y-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className="block text-ivory/60 hover:text-gold text-sm tracking-wide transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="px-6 py-6 border-t border-forest-light">
            <Button href="/contact" variant="primary" className="w-full justify-center" onClick={onClose}>
              Plan Your Journey
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
