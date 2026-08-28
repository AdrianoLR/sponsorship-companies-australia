# Company Index

A searchable, filterable directory of 3,546 companies across 28 industry categories, built with Next.js (App Router) and TypeScript. No external UI libraries — plain CSS with design tokens.

## Features

- **Full-text search** across the entire company list, with match highlighting
- **Category filters** (multi-select) with per-category counts and colour coding
- Live result count, active-filter chips, "Show more" incremental rendering
- Responsive down to mobile (category rail becomes a horizontal scroller)
- Static: all data is baked in at build time — no database, no API routes

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Updating the data

The source of truth is `data/companies_categorised.csv` (columns: `company`, `category`, `category_source`). After editing it, regenerate the JSON the app reads:

```bash
npm run data
```

This rewrites `data/companies.json` (trimmed, alphabetically sorted). New categories added to the CSV automatically get a stable fallback colour; you can pin a nicer hue in `lib/categories.ts`.

## Deploying to Vercel

The project is Vercel-ready with zero configuration:

1. Push this folder to a Git repository (GitHub, GitLab, or Bitbucket).
2. In Vercel, click **Add New → Project**, import the repo, and deploy. Vercel auto-detects Next.js — no settings needed.

Or deploy straight from the CLI:

```bash
npm i -g vercel
vercel
```

## Project structure

```
company-directory/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx          # Home page (server component)
│   └── globals.css       # Design tokens + all styles
├── components/
│   ├── Directory.tsx     # Client state: search + filters + paging
│   ├── CategoryRail.tsx  # Sticky category filter rail
│   ├── SearchBar.tsx     # Search input
│   └── CompanyList.tsx   # Result rows, highlighting, empty state
├── lib/
│   ├── companies.ts      # Types + data access + category stats
│   └── categories.ts     # Stable colour per category
├── data/
│   ├── companies_categorised.csv   # Source data (editable)
│   └── companies.json              # Generated — do not edit by hand
├── scripts/
│   └── csv-to-json.mjs   # npm run data
└── package.json
```
