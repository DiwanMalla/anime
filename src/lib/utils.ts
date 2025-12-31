import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentSeason() {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  if (month >= 0 && month <= 2) return { season: "WINTER", year };
  if (month >= 3 && month <= 5) return { season: "SPRING", year };
  if (month >= 6 && month <= 8) return { season: "SUMMER", year };
  return { season: "FALL", year };
}
