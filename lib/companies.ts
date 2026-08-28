import raw from "@/data/companies.json";

export type CategorySource = "original" | "inferred" | "unresolved";

export interface Company {
  company: string;
  category: string;
  category_source: CategorySource;
}

export interface CategoryStat {
  name: string;
  count: number;
}

const companies = raw as Company[];

/** Full list, pre-sorted alphabetically (case-insensitive) at build time. */
export function getCompanies(): Company[] {
  return companies;
}

/** Distinct categories with counts, largest first; "Unknown / To Check" always last. */
export function getCategoryStats(): CategoryStat[] {
  const counts = new Map<string, number>();
  for (const c of companies) {
    counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
  }
  const stats = [...counts.entries()].map(([name, count]) => ({ name, count }));
  stats.sort((a, b) => {
    const aUnknown = a.name === UNKNOWN_CATEGORY;
    const bUnknown = b.name === UNKNOWN_CATEGORY;
    if (aUnknown !== bUnknown) return aUnknown ? 1 : -1;
    return b.count - a.count || a.name.localeCompare(b.name);
  });
  return stats;
}

export const UNKNOWN_CATEGORY = "Unknown / To Check";
