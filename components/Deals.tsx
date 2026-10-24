"use client";

import { MENU, rs } from "@/lib/menu";
import { useCart } from "./CartContext";

export default function Deals() {
  const { openItem } = useCart();
  return (
    <section className="section" id="deals">
      <h2 className="title">HOT <span>DEALS</span></h2>
      <div className="deals">
        {MENU.filter((m) => m.cat === "deals").map((d) => (
          <div className="deal" key={d.id}>
            <h3>{d.name}</h3>
            <p>{d.desc}</p>
            <span className="price">{rs(d.price ?? 0)}</span>
            <button className="btn btn-yellow" onClick={() => openItem(d.id)}>Add Deal +</button>
          </div>
        ))}
      </div>
    </section>
  );
}
