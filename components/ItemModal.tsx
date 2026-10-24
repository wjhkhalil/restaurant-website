"use client";

import { useState } from "react";
import { EXTRAS, findItem, rs, unitPrice, type MenuItem, type SizeLabel } from "@/lib/menu";
import { useCart } from "./CartContext";
import Modal from "./Modal";

export default function ItemModal() {
  const { selectedId, closeItem } = useCart();
  const item = selectedId ? findItem(selectedId) : undefined;
  if (!item) return null;
  // key resets the form state whenever a different item is opened
  return (
    <Modal onClose={closeItem}>
      <ItemOptions key={item.id} item={item} />
    </Modal>
  );
}

function ItemOptions({ item }: { item: MenuItem }) {
  const { add, closeItem } = useCart();
  const [size, setSize] = useState<SizeLabel | null>(item.sizes ? item.sizes[0].label : null);
  const [flavour, setFlavour] = useState<string | null>(item.flavours ? item.flavours[0] : null);
  const [extras, setExtras] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  const toggleExtra = (id: string) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const confirm = () => {
    add({ id: item.id, size, flavour, extras, qty });
    closeItem();
  };

  return (
    <>
      <h3>{item.emoji} {item.name}</h3>
      <p>{item.desc}</p>

      {item.sizes && size && (
        <>
          <h4>Choose size</h4>
          <div className="seg">
            {item.sizes.map((s) => (
              <label key={s.label}>
                <input type="radio" name="size" checked={size === s.label} onChange={() => setSize(s.label)} />
                <span>{s.label} · {rs(s.price)}</span>
              </label>
            ))}
          </div>
          <h4>Add extras</h4>
          {EXTRAS.map((e) => (
            <label className="opt" key={e.id}>
              <input type="checkbox" checked={extras.includes(e.id)} onChange={() => toggleExtra(e.id)} />
              <span>{e.name}</span>
              <span>+ {rs(e[size])}</span>
            </label>
          ))}
        </>
      )}

      {item.flavours && (
        <>
          <h4>Choose flavour</h4>
          {item.flavours.map((f) => (
            <label className="opt" key={f}>
              <input type="radio" name="flavour" checked={flavour === f} onChange={() => setFlavour(f)} />
              <span>{f}</span>
            </label>
          ))}
        </>
      )}

      <div className="row center">
        <div className="qty">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
          <b>{qty}</b>
          <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
        </div>
        <span className="price">{rs(unitPrice(item, size, extras) * qty)}</span>
      </div>
      <button type="button" className="btn btn-green full" onClick={confirm}>Add to Order »</button>
    </>
  );
}
