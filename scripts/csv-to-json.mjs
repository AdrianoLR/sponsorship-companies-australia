/**
 * Regenerates data/companies.json from data/companies_categorised.csv.
 * Run with: npm run data
 *
 * The CSV is simple (no quoted commas in the current file), but this parser
 * still handles RFC-4180 quoted fields to be safe.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = join(root, "data", "companies_categorised.csv");
const outPath = join(root, "data", "companies.json");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    if (row.some((v) => v !== "")) rows.push(row);
  }
  return rows;
}

const rows = parseCsv(readFileSync(csvPath, "utf8"));
const header = rows[0].map((h) => h.trim());
const companyIdx = header.indexOf("company");
const categoryIdx = header.indexOf("category");
const sourceIdx = header.indexOf("category_source");

const records = rows
  .slice(1)
  .map((r) => ({
    company: (r[companyIdx] ?? "").trim(),
    category: (r[categoryIdx] ?? "").trim(),
    category_source: (r[sourceIdx] ?? "").trim(),
  }))
  .filter((r) => r.company !== "")
  .sort((a, b) =>
    a.company.toLowerCase().localeCompare(b.company.toLowerCase())
  );

writeFileSync(outPath, JSON.stringify(records));
console.log(`Wrote ${records.length} records to data/companies.json`);
