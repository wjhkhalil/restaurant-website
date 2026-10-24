"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, MENU, basePrice, rs, type Category } from "@/lib/menu";
import { useCart } from "./CartContext";

export default function MenuSection() {
  const { openItem } = useCart();
  const [cat, setCat] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU.filter(
      (m) => (cat === "all" || m.cat === cat) && (!q || `${m.name} ${m.desc} ${m.flavours?.join(" ") ?? ""}`.toLowerCase().includes(q)),
    );
  }, [cat, query]);

  return (
    <section className="section" id="menu">
      <h2 className="title">OUR <span>MENU</span></h2>
      <div className="toolbar">
        <div className="tabs" role="tablist">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              className={`tab${cat === c.id ? " active" : ""}`}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <input
          className="search"
          type="search"
          placeholder="Search menu… (e.g. peri)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search menu"
        />
      </div>

      <div className="grid">
        {items.length === 0 && <p className="empty">No items match “{query}”. Try another search.</p>}
        {items.map((m) => (
          <article className="card" key={m.id}>
            <div className="card-img">
              {m.tag && <span className="tag">{m.tag}</span>}
              {m.emoji}
            </div>
            <div className="card-body">
              <h3>{m.name}</h3>
              <p>{m.desc}</p>
              <div className="card-foot">
                <span className="price">
                  {m.sizes && m.sizes.length > 1 && <small>from </small>}
                  {rs(basePrice(m))}
                </span>
                <button className="add" onClick={() => openItem(m.id)}>Add +</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
