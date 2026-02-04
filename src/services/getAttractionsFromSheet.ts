import { type Attraction } from "../types/Attraction";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1p20vsjsWYTJrISFgFSW15XC7ilcl2FMAsWpTCyiDHDM/edit?gid=0#gid=0";

export async function getAttractionsFromSheet(): Promise<Attraction[]> {
  const res = await fetch(SHEET_URL);
  const csv = await res.text();

  const rows = csv.split("\n").slice(1);

  return rows
    .filter(Boolean)
    .map((row) => {
      const [
        id,
        slug,
        title,
        subtitle,
        shortDescription,
        price,
        rating,
        reviews,
        heroImage,
        gallery,
        whatYouWillDo,
        whatsIncluded,
      ] = row.split(",");

      return {
        id: Number(id),
        slug,
        title,
        subtitle,
        shortDescription,
        price: Number(price),
        rating: Number(rating),
        reviews: Number(reviews),
        heroImage,
        gallery: gallery.split("|").map((s) => s.trim()),
        whatYouWillDo: whatYouWillDo.split("|").map((s) => s.trim()),
        whatsIncluded: whatsIncluded.split("|").map((s) => s.trim()),
      };
    });
}