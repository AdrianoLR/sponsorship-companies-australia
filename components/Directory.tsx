"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { Company, CategoryStat } from "@/lib/companies";
import CategoryRail from "@/components/CategoryRail";
import SearchBar from "@/components/SearchBar";
import CompanyList from "@/components/CompanyList";
import { categoryColor } from "@/lib/categories";

const PAGE_SIZE = 120;

interface Props {
  companies: Company[];
  categories: CategoryStat[];
}

export default function Directory({ companies, categories }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [visible, setVisible] = useState(PAGE_SIZE);

  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return companies.filter((c) => {
      if (selected.size > 0 && !selected.has(c.category)) return false;
      if (q && !c.company.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [companies, deferredQuery, selected]);

  function toggleCategory(name: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
    setVisible(PAGE_SIZE);
  }

  function clearCategories() {
    setSelected(new Set());
    setVisible(PAGE_SIZE);
  }

  function handleQuery(value: string) {
    setQuery(value);
    setVisible(PAGE_SIZE);
  }

  const activeCategories = categories.filter((c) => selected.has(c.name));

  return (
    <div className="directory">
      <CategoryRail
        categories={categories}
        selected={selected}
        onToggle={toggleCategory}
        onClear={clearCategories}
      />

      <section aria-label="Company results">
        <div className="results-head">
          <SearchBar value={query} onChange={handleQuery} />

          <div className="results-meta" role="status">
            <span>
              <strong>{filtered.length.toLocaleString()}</strong>
              {" of "}
              {companies.length.toLocaleString()} companies
            </span>
            {activeCategories.map((c) => (
              <span
                key={c.name}
                className="active-chip"
                style={{ "--tick": categoryColor(c.name) } as React.CSSProperties}
              >
                <span className="dot" aria-hidden="true" />
                {c.name}
                <button
                  type="button"
                  aria-label={`Remove ${c.name} filter`}
                  onClick={() => toggleCategory(c.name)}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 3l6 6M9 3l-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>

        <CompanyList
          companies={filtered.slice(0, visible)}
          query={deferredQuery.trim()}
          totalFiltered={filtered.length}
          onClearAll={() => {
            setQuery("");
            clearCategories();
          }}
        />

        {filtered.length > visible && (
          <div className="more">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE * 2)}
            >
              Show more ({(filtered.length - visible).toLocaleString()}{" "}
              remaining)
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
