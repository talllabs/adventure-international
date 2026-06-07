// Base fetcher for Google Sheets API v4
// Uses public API key — sheet must be "Anyone with link can view"

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY!;

export type SheetRow = string[];

export async function fetchSheetRange(range: string): Promise<SheetRow[]> {
  if (!SHEET_ID || !API_KEY) {
    return [];
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?key=${API_KEY}`;

  const res = await fetch(url, {
    next: { revalidate: 300 }, // cache 5 minutes; edit sheet → live within 5 min
  });

  if (!res.ok) {
    console.error(`Sheets API error for range "${range}": ${res.status} ${res.statusText}`);
    return [];
  }

  const json = await res.json();
  const rows: SheetRow[] = json.values ?? [];

  // First row is headers — return data rows only
  return rows.slice(1);
}

// Split pipe-separated multi-values, trim whitespace, filter empties
export function splitPipe(value: string): string[] {
  if (!value) return [];
  return value.split("|").map((s) => s.trim()).filter(Boolean);
}

// Convert "TRUE"/"FALSE" string to boolean
export function parseBool(value: string): boolean {
  return value?.toUpperCase() === "TRUE";
}
