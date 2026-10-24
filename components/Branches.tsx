import { CONFIG } from "@/lib/menu";

export default function Branches() {
  return (
    <section className="section green" id="branches">
      <h2 className="title light">OUR <span>BRANCHES</span></h2>
      <div className="branches">
        {CONFIG.branches.map((b) => (
          <div className="branch" key={b.name}>
            <h3>📍 {b.name}</h3>
            <p>{b.address}</p>
            <a href={`https://www.google.com/maps/search/${encodeURIComponent(b.address)}`} target="_blank" rel="noopener noreferrer">
              Get directions »
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
