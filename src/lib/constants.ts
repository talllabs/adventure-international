export const REGIONS = [
  { value: "africa", label: "Africa" },
  { value: "asia", label: "Asia" },
  { value: "south-america", label: "South America" },
  { value: "north-america", label: "North America" },
  { value: "central-america", label: "Central America" },
  { value: "europe", label: "Europe" },
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
      { label: "Africa", href: "/destinations?region=africa" },
      { label: "Asia", href: "/destinations?region=asia" },
      { label: "South America", href: "/destinations?region=south-america" },
      { label: "Central America", href: "/destinations?region=central-america" },
      { label: "Europe", href: "/destinations?region=europe" },
    ],
  },
  { label: "Itineraries", href: "/itineraries" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];
