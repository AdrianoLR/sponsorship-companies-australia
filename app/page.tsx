import Directory from "@/components/Directory";
import Link from 'next/link';
import { getCompanies, getCategoryStats } from "@/lib/companies";

export default function HomePage() {
  const companies = getCompanies();
  const categories = getCategoryStats();

  return (
    <main className="shell">
      <header className="masthead">
        <p className="masthead-eyebrow">Freedom of Information 15-01-2025</p>
        <h1>
          {companies.length.toLocaleString()} accredited sponsor companies in Australia,
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
        Source: <Link href="https://www.homeaffairs.gov.au/foi/files/2025/fa-250101229-document-released.PDF">Accredited Sponsorship Companies</Link>
      </footer>
    </main>
  );
}
