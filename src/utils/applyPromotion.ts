import { type Promotion } from "../data/promotions";

export function applyPromotion(
  tourId: number,
  code: string,
  price: number,
  promotions: Promotion[]
): number {
  if (!code) return price;

  const normalized = code.trim().toUpperCase();

  const promo = promotions.find(
    (p) =>
      p.tourId === tourId &&
      p.promotionCode === normalized
  );

  if (!promo) return price;

  const discounted = price - promo.promotionDiscount;

  // nunca permitir total negativo
  return discounted > 0 ? discounted : 0;
}