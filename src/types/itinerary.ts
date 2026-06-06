export interface ItineraryDay {
  day: number;
  location: string;
  title: string;
  description: string;
  image: string | null;
}

export interface Accommodation {
  name: string;
  location: string;
  nights: number;
  category: string;
  image: string;
}

export interface ItineraryMeta {
  title: string;
  description: string;
}

export interface Itinerary {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  galleryImages: string[];
  destinations: string[];
  themes: string[];
  overview: string;
  duration: number;
  groupSize: string;
  physicalRating: string;
  highlights: string[];
  routeMapImage: string;
  days: ItineraryDay[];
  accommodations: Accommodation[];
  inclusions: string[];
  exclusions: string[];
  priceFrom: number;
  featured: boolean;
  relatedJourneys: string[];
  meta: ItineraryMeta;
}
