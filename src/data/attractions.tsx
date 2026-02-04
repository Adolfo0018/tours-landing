import { type Attraction } from "../types/Attraction";
import Papa from "papaparse";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vShni0lVnfqKKpuN_jDJ_WYIuTGhV6TcqbQYySQULfAXTY53ATICS2d5Yk9SksLVhJ5HPWSRygEbKeb/pub?gid=0&single=true&output=csv";

const CACHE_KEY = "tours_cache";
const HASH_KEY = "tours_hash";

// hash súper ligero del texto
function simpleHash(str: string) {
  let hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash.toString();
}

export async function getAttractions(): Promise<Attraction[]> {
  const cached = localStorage.getItem(CACHE_KEY);
  const cachedHash = localStorage.getItem(HASH_KEY);

  const res = await fetch(SHEET_URL, { cache: "no-store" });
  const csv = await res.text();

  const newHash = simpleHash(csv);

  // ✅ Si no cambió, usamos cache
  if (cached && cachedHash === newHash) {
    console.log("Retornando cache")
    return JSON.parse(cached);
  }

  // 🔄 Si cambió, parseamos de nuevo
  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  const attractions: Attraction[] = parsed.data.map((row: any) => ({
    id: Number(row.id),
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    shortDescription: row.shortDescription,
    price: Number(row.price),
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    heroImage: row.heroImage,
    gallery: row.gallery.split("|").map((s: string) => s.trim()),
    whatYouWillDo: row.whatYouWillDo.split("|").map((s: string) => s.trim()),
    whatsIncluded: row.whatsIncluded.split("|").map((s: string) => s.trim()),
  }));

  // 💾 guardamos cache nuevo
  localStorage.setItem(CACHE_KEY, JSON.stringify(attractions));
  localStorage.setItem(HASH_KEY, newHash);

  return attractions;
}