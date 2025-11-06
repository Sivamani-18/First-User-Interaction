import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="page">
      <h1>Contact Page</h1>
      <p>
        Another simple route to test navigation and cross-tab behaviour of the
        interaction listener.
      </p>

      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <section className="card">
        <h2>Tip</h2>
        <p>
          Try closing all tabs of this site, reopening <code>/</code>, and then
          interacting again. A new <strong>first interaction</strong> should be captured.
        </p>
      </section>
    </main>
  );
}
