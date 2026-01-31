export interface Attraction {
  id: number;
  slug: string;

  title: string;
  subtitle?: string;
  shortDescription: string;

  price: number;
  rating?: number;
  reviews?: number;

  heroImage: string;
  gallery: string[];

  whatYouWillDo: string[];
  whatsIncluded: string[];
}