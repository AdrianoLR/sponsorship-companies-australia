import Directory from "@/components/Directory";
import { getCompanies, getCategoryStats } from "@/lib/companies";

export default function HomePage() {
  const companies = getCompanies();
  const categories = getCategoryStats();

  return (
    <main className="shell">
      <header className="masthead">
        <p className="masthead-eyebrow">Company Index</p>
        <h1>
          {companies.length.toLocaleString()} companies,
          <br />
          filed under <em>{categories.length} categories</em>.
        </h1>
        <div className="masthead-stats">
          <span>
            <strong>{companies.length.toLocaleString()}</strong> entries
          </span>
          <span>
            <strong>{categories.length}</strong> categories
          </span>
          <span>A–Z, searchable</span>
        </div>
      </header>

      <Directory companies={companies} categories={categories} />

      <footer className="foot">
        Source: companies_categorised.csv · category_source = original ·
        inferred · unresolved
      </footer>
    </main>
  );
}
