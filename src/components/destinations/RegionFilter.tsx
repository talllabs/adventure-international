"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

function RegionFilterInner({ activeRegion }: { activeRegion?: string }) {
  const router = useRouter();

  function handleClick(value: string | null) {
    if (value) {
      router.push(`/destinations?region=${value}`);
    } else {
      router.push("/destinations");
    }
  }

  return (
    <div className="bg-ivory border-b border-ivory-deep sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
          <button
            onClick={() => handleClick(null)}
            className={cn(
              "flex-shrink-0 px-5 py-2 text-xs tracking-widest uppercase transition-colors border",
              !activeRegion
                ? "bg-forest text-ivory border-forest"
                : "border-charcoal/20 text-charcoal-soft hover:border-gold hover:text-gold"
            )}
          >
            All
          </button>
          {REGIONS.map((region) => (
            <button
              key={region.value}
              onClick={() => handleClick(region.value)}
              className={cn(
                "flex-shrink-0 px-5 py-2 text-xs tracking-widest uppercase transition-colors border",
                activeRegion === region.value
                  ? "bg-forest text-ivory border-forest"
                  : "border-charcoal/20 text-charcoal-soft hover:border-gold hover:text-gold"
              )}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RegionFilter({ activeRegion }: { activeRegion?: string }) {
  return (
    <Suspense fallback={<div className="h-14 bg-ivory border-b border-ivory-deep" />}>
      <RegionFilterInner activeRegion={activeRegion} />
    </Suspense>
  );
}
