"use client";

import type { Company } from "@/lib/companies";
import { categoryColor } from "@/lib/categories";

interface Props {
  companies: Company[];
  query: string;
  totalFiltered: number;
  onClearAll: () => void;
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    const idx = lower.indexOf(q, i);
    if (idx === -1) {
      parts.push(text.slice(i));
      break;
    }
    if (idx > i) parts.push(text.slice(i, idx));
    parts.push(<mark key={key++}>{text.slice(idx, idx + q.length)}</mark>);
    i = idx + q.length;
  }
  return <>{parts}</>;
}

export default function CompanyList({
  companies,
  query,
  totalFiltered,
  onClearAll,
}: Props) {
  if (totalFiltered === 0) {
    return (
      <div className="list">
        <div className="empty">
          <h3>No companies match</h3>
          <p>
            Try a shorter search term, or{" "}
            <button
              type="button"
              className="rail-clear"
              onClick={onClearAll}
              style={{ font: "inherit" }}
            >
              clear search and filters
            </button>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className="list">
      {companies.map((c) => (
        <li key={c.company + c.category} className="row">
          <span className="row-name">
            <Highlight text={c.company} query={query} />
          </span>
          <span
            className="row-cat"
            style={{ "--tick": categoryColor(c.category) } as React.CSSProperties}
            title={`Category source: ${c.category_source}`}
          >
            <span className="dot" aria-hidden="true" />
            {c.category}
            {c.category_source !== "original" && (
              <span className="row-source">{c.category_source}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
