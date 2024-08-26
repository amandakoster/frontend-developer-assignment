import { primaryBlue, secondaryBlue, accentGreen } from "@/utils/colors";

const colorMap: { [key: string]: string } = {
  "2023": primaryBlue,
  "2024": secondaryBlue,
  "2025": accentGreen,
};

export function getYearColor(year: string): string {
  return colorMap[year] || "#000000";
}
