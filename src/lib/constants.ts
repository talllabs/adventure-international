export const REGIONS = [
  {
    value: "africa",
    label: "Africa",
    countries: ["Tanzania", "Kenya", "Morocco", "Rwanda", "Uganda"],
  },
  {
    value: "asia",
    label: "Asia",
    countries: ["Nepal", "Bhutan"],
  },
  {
    value: "south-america",
    label: "South America",
    countries: ["Peru", "Ecuador & Galapagos", "Patagonia"],
  },
  {
    value: "north-america",
    label: "North America",
    countries: ["USA", "Canada & Alaska"],
  },
  {
    value: "central-america",
    label: "Central America",
    countries: ["Guatemala", "Costa Rica"],
  },
  {
    value: "europe",
    label: "Europe",
    countries: ["Alps", "Dolomites"],
  },
];

export const EXPERIENCE_THEMES = [
  "Big Cats",
  "Glamping",
  "Safari",
  "Trekking",
  "Surf & Turf",
  "Conservation",
  "Peaks & Wildlife",
  "Family",
  "Helicopter",
  "Luxsurf",
];

export const NAV_LINKS = [
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      {
        label: "Africa",
        href: "/destinations?region=africa",
        countries: [
          { label: "Tanzania", href: "/destinations?region=africa&country=Tanzania" },
          { label: "Kenya", href: "/destinations?region=africa&country=Kenya" },
          { label: "Morocco", href: "/destinations?region=africa&country=Morocco" },
          { label: "Rwanda", href: "/destinations?region=africa&country=Rwanda" },
          { label: "Uganda", href: "/destinations?region=africa&country=Uganda" },
        ],
      },
      {
        label: "Asia",
        href: "/destinations?region=asia",
        countries: [
          { label: "Nepal", href: "/destinations?region=asia&country=Nepal" },
          { label: "Bhutan", href: "/destinations?region=asia&country=Bhutan" },
        ],
      },
      {
        label: "South America",
        href: "/destinations?region=south-america",
        countries: [
          { label: "Peru", href: "/destinations?region=south-america&country=Peru" },
          { label: "Ecuador & Galapagos", href: "/destinations?region=south-america&country=Ecuador" },
          { label: "Patagonia", href: "/destinations?region=south-america&country=Patagonia" },
        ],
      },
      {
        label: "North America",
        href: "/destinations?region=north-america",
        countries: [
          { label: "USA", href: "/destinations?region=north-america&country=USA" },
          { label: "Canada & Alaska", href: "/destinations?region=north-america&country=Canada" },
        ],
      },
      {
        label: "Central America",
        href: "/destinations?region=central-america",
        countries: [
          { label: "Guatemala", href: "/destinations?region=central-america&country=Guatemala" },
          { label: "Costa Rica", href: "/destinations?region=central-america&country=Costa Rica" },
        ],
      },
      {
        label: "Europe",
        href: "/destinations?region=europe",
        countries: [
          { label: "Alps", href: "/destinations?region=europe&country=Alps" },
          { label: "Dolomites", href: "/destinations?region=europe&country=Dolomites" },
        ],
      },
    ],
  },
  { label: "Signature Expeditions", href: "/itineraries" },
  { label: "Journal", href: "/journal" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];
