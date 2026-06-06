export interface SubBrandSection {
  label: string;
  headline: string;
  body: string;
  image: string;
  imageAlt: string;
}

export interface SubBrandMeta {
  title: string;
  description: string;
}

export interface SubBrand {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  themes: string[];
  featuredDestinations: string[];
  featuredItineraries: string[];
  sections: SubBrandSection[];
  meta: SubBrandMeta;
}
