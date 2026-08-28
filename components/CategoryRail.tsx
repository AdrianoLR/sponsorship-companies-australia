"use client";

import type { CategoryStat } from "@/lib/companies";
import { categoryColor } from "@/lib/categories";

interface Props {
  categories: CategoryStat[];
  selected: Set<string>;
  onToggle: (name: string) => void;
  onClear: () => void;
}

export default function CategoryRail({
  categories,
  selected,
  onToggle,
  onClear,
}: Props) {
  return (
    <aside className="rail" aria-label="Filter by category">
      <div className="rail-title">
        <h2>Categories</h2>
        {selected.size > 0 && (
          <button type="button" className="rail-clear" onClick={onClear}>
            Clear ({selected.size})
          </button>
        )}
      </div>
      <ul className="rail-list">
        {categories.map((c) => (
          <li key={c.name}>
            <button
              type="button"
              className="cat"
              aria-pressed={selected.has(c.name)}
              onClick={() => onToggle(c.name)}
              style={{ "--tick": categoryColor(c.name) } as React.CSSProperties}
            >
              <span className="cat-tick" aria-hidden="true" />
              <span className="cat-name">{c.name}</span>
              <span className="cat-count">{c.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
