import { CONFIG, rs } from "@/lib/menu";

const promos = [
  "🍕 Detroit Pizza from Rs. 650",
  "🪣 Wings Bucket 10 pcs Rs. 750",
  "🍟 Foot Long Fries Rs. 750",
  "👑 Try the GenZ Crown",
  `🛵 Free delivery above ${rs(CONFIG.freeDeliveryAbove)}`,
];

export default function Marquee() {
  // Duplicated so the -50% scroll loops seamlessly
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...promos, ...promos].map((p, i) => (
          <span key={i}>{p}</span>
        ))}
      </div>
    </div>
  );
}
