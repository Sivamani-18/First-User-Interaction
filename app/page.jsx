import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <h1>First User Interaction Demo</h1>
      <p>
        This demo tracks the very first click or pointer interaction in this browser
        session, across all tabs and routes.
      </p>
      <p>
        Try clicking somewhere on this page, then open another tab to{" "}
        <code>/saunas</code> or <code>/contact</code>. You should only see the
        <strong> first interaction </strong> log once per browser run.
      </p>

      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <section className="card">
        <h2>How to test</h2>
        <ol>
          <li>Open DevTools → Console.</li>
          <li>Click anywhere on this page.</li>
          <li>Open a new tab with <code>/saunas</code>.</li>
          <li>Navigate between routes using the links above.</li>
          <li>
            You should only see one <code>🎉 First user interaction captured</code>{" "}
            message per browser session.
          </li>
        </ol>
      </section>
    </main>
  );
}
