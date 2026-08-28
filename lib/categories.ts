import { UNKNOWN_CATEGORY } from "@/lib/companies";

/**
 * Every category gets a stable hue so its tick mark and chip read the same
 * everywhere in the UI. Hues are hand-spread around the wheel (rather than
 * hashed) so neighbouring categories in the rail never collide.
 */
const CATEGORY_HUES: Record<string, number> = {
  "Information Technology & Software": 221,
  "Healthcare, Medical & Pharmaceutical": 354,
  "Manufacturing & Industrial": 27,
  "Engineering & Construction": 39,
  "Education - Schools & Training": 262,
  "Mining, Resources & Energy": 16,
  "Banking & Financial Services": 152,
  "Agriculture, Food & Beverage": 96,
  "Automotive": 205,
  "Consumer Goods & Retail": 322,
  "Media, Entertainment & Creative": 288,
  "Consulting, Accounting & Professional Services": 172,
  "Hospitality, Travel & Tourism": 336,
  "Transport & Logistics": 48,
  "Government & Public Sector": 236,
  "Marketing & Advertising": 305,
  "Aged Care, Disability & Social Services": 8,
  "Insurance": 188,
  "Religious, Charitable & Non-profit": 68,
  "Recruitment, HR & Labour Hire": 248,
  "Education - Universities & Higher Ed": 275,
  "Aviation & Aerospace": 196,
  "Real Estate & Property": 130,
  "Architecture & Design": 160,
  "Telecommunications": 213,
  "Legal Services": 82,
  "Defence & Aerospace": 230,
};

export function categoryColor(category: string): string {
  if (category === UNKNOWN_CATEGORY) return "hsl(150 4% 62%)";
  const hue = CATEGORY_HUES[category];
  if (hue === undefined) {
    // Fallback for categories added to the CSV later: derive a stable hue.
    let h = 0;
    for (let i = 0; i < category.length; i++) {
      h = (h * 31 + category.charCodeAt(i)) % 360;
    }
    return `hsl(${h} 58% 44%)`;
  }
  return `hsl(${hue} 58% 44%)`;
}

export function categoryTint(category: string): string {
  if (category === UNKNOWN_CATEGORY) return "hsl(150 6% 94%)";
  const hue = CATEGORY_HUES[category];
  const h =
    hue !== undefined
      ? hue
      : [...category].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) % 360, 0);
  return `hsl(${h} 45% 95%)`;
}
