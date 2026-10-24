import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound">
      <div>
        <div>🍕</div>
        <h1 className="title">PAGE <span>NOT FOUND</span></h1>
        <Link href="/" className="btn btn-yellow">Back to Menu »</Link>
      </div>
    </main>
  );
}
