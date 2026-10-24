"use client";

import { useState } from "react";
import { CONFIG, findItem, rs } from "@/lib/menu";
import { describeLine, useCart, type OrderMode } from "./CartContext";
import Modal from "./Modal";

const PHONE_RE = /^(\+92|0)3\d{2}-?\d{7}$/;

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen } = useCart();
  if (!checkoutOpen) return null;
  return (
    <Modal onClose={() => setCheckoutOpen(false)}>
      <CheckoutForm />
    </Modal>
  );
}

function CheckoutForm() {
  const { cart, subtotal, delivery, total, mode, setMode, clear, setCheckoutOpen, showToast } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", branch: "", address: "", notes: "", pay: "Cash on Delivery" });
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim();
    const address = form.address.trim();
    const notes = form.notes.trim();
    if (!cart.length) return setError("Your cart is empty.");
    if (!name) return setError("Please enter your name.");
    if (!PHONE_RE.test(phone)) return setError("Enter a valid mobile number, e.g. 0300-1234567.");
    if (!form.branch) return setError("Please select a branch.");
    if (mode === "Delivery" && !address) return setError("Please enter your delivery address.");

    const msg = [
      `*New Order — ${CONFIG.name}*`,
      "",
      ...cart.map((l) => {
        const d = describeLine(l);
        return `• ${l.qty} x ${findItem(l.id)!.name}${d ? ` (${d})` : ""} = ${rs(l.price * l.qty)}`;
      }),
      "",
      `Subtotal: ${rs(subtotal)}`,
      `Delivery: ${delivery ? rs(delivery) : "Free"}`,
      `*Total: ${rs(total)}*`,
      "",
      `Type: ${mode}`,
      `Branch: ${form.branch}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      ...(mode === "Delivery" ? [`Address: ${address}`] : []),
      `Payment: ${form.pay}`,
      ...(notes ? [`Notes: ${notes}`] : []),
    ].join("\n");

    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    clear();
    setCheckoutOpen(false);
    showToast("🎉 Order sent! We’ll confirm on WhatsApp.");
  };

  return (
    <form onSubmit={submit} noValidate className="form">
      <h3>Checkout</h3>

      <div className="seg">
        {(["Delivery", "Takeaway"] as OrderMode[]).map((m) => (
          <label key={m}>
            <input type="radio" name="mode" checked={mode === m} onChange={() => setMode(m)} />
            <span>{m === "Delivery" ? "🛵 Delivery" : "🥡 Takeaway"}</span>
          </label>
        ))}
      </div>

      <input placeholder="Your name" value={form.name} onChange={set("name")} autoComplete="name" />
      <input placeholder="Phone (03xx-xxxxxxx)" value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" />
      <select value={form.branch} onChange={set("branch")}>
        <option value="">Select nearest branch</option>
        {CONFIG.branches.map((b) => <option key={b.name}>{b.name}</option>)}
      </select>
      {mode === "Delivery" && (
        <textarea placeholder="Delivery address" rows={2} value={form.address} onChange={set("address")} autoComplete="street-address" />
      )}
      <textarea placeholder="Notes (e.g. extra spicy, no onion)" rows={2} value={form.notes} onChange={set("notes")} />

      <div className="seg">
        {[["Cash on Delivery", "💵 Cash"], ["JazzCash / Easypaisa", "📱 JazzCash / Easypaisa"]].map(([v, label]) => (
          <label key={v}>
            <input type="radio" name="pay" checked={form.pay === v} onChange={() => setForm((f) => ({ ...f, pay: v }))} />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <p className="error" role="alert">{error}</p>
      <div className="row"><span>Subtotal</span><b>{rs(subtotal)}</b></div>
      <div className="row"><span>Delivery</span><b>{delivery ? rs(delivery) : "FREE"}</b></div>
      <div className="row total"><span>Total</span><b>{rs(total)}</b></div>
      <button className="btn btn-yellow full" type="submit">Place Order on WhatsApp »</button>
    </form>
  );
}
