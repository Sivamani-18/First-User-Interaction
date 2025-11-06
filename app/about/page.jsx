import Link from "next/link";

export default function SaunasPage() {
  return (
    <main className="page">
      <h1>About Page</h1>
      <p>
        This is just a demo route to show the first user interaction tracking
        across different paths.
      </p>

      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <section className="card">
        <h2>Check the console</h2>
        <p>
          If the first interaction was already captured on another tab or route,
          you should <strong>not</strong> see another 🎉 message here.
        </p>
      </section>
    </main>
  );
}
