export interface SignatureExperience {
  title: string;
  description: string;
  icon: string;
}

export interface WildlifeHighlight {
  species: string;
  bestSeason: string;
  notes: string;
}

export interface Lodging {
  name: string;
  category: string;
  description: string;
  image: string;
}

export interface DestinationMeta {
  title: string;
  description: string;
}

export interface Destination {
  slug: string;
  region: string;
  name: string;
  country: string;
  tagline: string;
  heroImage: string;
  galleryImages: string[];
  intro: string;
  themes: string[];
  signatureExperiences: SignatureExperience[];
  wildlifeHighlights: WildlifeHighlight[];
  sampleItineraries: string[];
  lodging: Lodging[];
  bestTimeToVisit: string;
  relatedDestinations: string[];
  relatedJournalArticles: string[];
  meta: DestinationMeta;
}
