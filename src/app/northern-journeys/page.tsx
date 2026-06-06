import { Metadata } from "next";
import { getSubBrand } from "@/lib/content/subbrands";
import { SubBrandPage } from "@/components/sub-brands/SubBrandPage";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const brand = getSubBrand("northern-journeys");
  if (!brand) return {};
  return { title: brand.meta.title, description: brand.meta.description };
}

export default function NorthernJourneysPage() {
  const brand = getSubBrand("northern-journeys");
  if (!brand) notFound();
  return <SubBrandPage brand={brand} />;
}
