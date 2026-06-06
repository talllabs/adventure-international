import fs from "fs";
import path from "path";
import { SubBrand } from "@/types/subbrand";

const SUBBRANDS_DIR = path.join(process.cwd(), "content", "sub-brands");

export function getAllSubBrands(): SubBrand[] {
  const files = fs
    .readdirSync(SUBBRANDS_DIR)
    .filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(SUBBRANDS_DIR, file), "utf-8");
    return JSON.parse(raw) as SubBrand;
  });
}

export function getSubBrand(slug: string): SubBrand | null {
  const filePath = path.join(SUBBRANDS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SubBrand;
}
