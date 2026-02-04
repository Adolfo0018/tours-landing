import { useEffect, useState } from "react";
import { type Attraction } from "../types/Attraction";
import { getAttractionsFromSheet } from "../services/getAttractionsFromSheet";

export function useAttractions() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);

  useEffect(() => {
    getAttractionsFromSheet().then(setAttractions);
  }, []);

  return attractions;
}