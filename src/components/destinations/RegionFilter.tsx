"use client";

import { useRouter } from "next/navigation";
import { REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

function RegionFilterInner({ activeRegion, activeCountry }: { activeRegion?: string; activeCountry?: string }) {
  const router = useRouter();

  function handleRegion(value: string | null) {
    router.push(value ? `/destinations?region=${value}` : "/destinations");
  }

  function handleCountry(region: string, country: string) {
    router.push(`/destinations?region=${region}&country=${encodeURIComponent(country)}`);
  }

  const activeRegionData = REGIONS.find((r) => r.value === activeRegion);

  return (
    <div className="bg-[#0a0a0a] border-b border-white/10 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Region row */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
          <button
            onClick={() => handleRegion(null)}
            className={cn(
              "flex-shrink-0 px-5 py-2 text-xs tracking-widest uppercase transition-colors border",
              !activeRegion
                ? "bg-gold text-black border-gold"
                : "border-white/20 text-white/60 hover:border-gold hover:text-gold"
            )}
          >
            All
          </button>
          {REGIONS.map((region) => (
            <button
              key={region.value}
              onClick={() => handleRegion(region.value)}
              className={cn(
                "flex-shrink-0 px-5 py-2 text-xs tracking-widest uppercase transition-colors border",
                activeRegion === region.value
                  ? "bg-gold text-black border-gold"
                  : "border-white/20 text-white/60 hover:border-gold hover:text-gold"
              )}
            >
              {region.label}
            </button>
          ))}
        </div>

        {/* Country row — shown when a region is selected */}
        {activeRegion && activeRegionData?.countries?.length && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
            <button
              onClick={() => handleRegion(activeRegion)}
              className={cn(
                "flex-shrink-0 px-4 py-1.5 text-xs tracking-widest uppercase transition-colors border",
                !activeCountry
                  ? "border-white/40 text-white"
                  : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/60"
              )}
            >
              All {activeRegionData.label}
            </button>
            {activeRegionData.countries.map((country) => (
              <button
                key={country}
                onClick={() => handleCountry(activeRegion, country)}
                className={cn(
                  "flex-shrink-0 px-4 py-1.5 text-xs tracking-widest uppercase transition-colors border",
                  activeCountry?.toLowerCase() === country.toLowerCase()
                    ? "border-gold/60 text-gold"
                    : "border-white/10 text-white/40 hover:border-gold/40 hover:text-gold/70"
                )}
              >
                {country}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function RegionFilter({ activeRegion, activeCountry }: { activeRegion?: string; activeCountry?: string }) {
  return (
    <Suspense fallback={<div className="h-14 bg-[#0a0a0a] border-b border-white/10" />}>
      <RegionFilterInner activeRegion={activeRegion} activeCountry={activeCountry} />
    </Suspense>
  );
}
