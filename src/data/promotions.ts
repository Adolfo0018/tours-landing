import Papa from "papaparse";

const PROMOTIONS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vShni0lVnfqKKpuN_jDJ_WYIuTGhV6TcqbQYySQULfAXTY53ATICS2d5Yk9SksLVhJ5HPWSRygEbKeb/pub?gid=1050016650&single=true&output=csv";

const CACHE_KEY = "promotions_cache";
const HASH_KEY = "promotions_hash";

export interface Promotion {
  tourId: number;
  promotionCode: string;
  promotionDiscount: number;
}

function simpleHash(str: string) {
  let hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash.toString();
}

export async function getPromotions(): Promise<Promotion[]> {
  const cached = localStorage.getItem(CACHE_KEY);
  const cachedHash = localStorage.getItem(HASH_KEY);

  const res = await fetch(PROMOTIONS_URL, { cache: "no-store" });
  const csv = await res.text();

  const newHash = simpleHash(csv);

  // ✅ si no cambió, usa cache
  if (cached && cachedHash === newHash) {
    return JSON.parse(cached);
  }

  // 🔄 si cambió, parsea
  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  const promotions: Promotion[] = parsed.data.map((row: any) => ({
    tourId: Number(row.tourId),
    promotionCode: row.promotionCode.trim().toUpperCase(),
    promotionDiscount: Number(row.promotionDiscount),
  }));

  localStorage.setItem(CACHE_KEY, JSON.stringify(promotions));
  localStorage.setItem(HASH_KEY, newHash);

  return promotions;
}