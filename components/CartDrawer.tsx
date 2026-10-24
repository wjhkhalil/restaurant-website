"use client";

import { useEffect } from "react";
import { CONFIG, findItem, rs } from "@/lib/menu";
import { describeLine, useCart } from "./CartContext";

export default function CartDrawer() {
  const { cart, subtotal, delivery, total, changeQty, drawerOpen, setDrawerOpen, setCheckoutOpen } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen, setDrawerOpen]);

  const remaining = CONFIG.freeDeliveryAbove - subtotal;

  return (
    <>
      {drawerOpen && <div className="scrim" onClick={() => setDrawerOpen(false)} />}
      <aside className={`drawer${drawerOpen ? " open" : ""}`} aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <h3>Your Order</h3>
          <button type="button" className="close" onClick={() => setDrawerOpen(false)} aria-label="Close cart">&times;</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div>🍕</div>
              <p>Your cart is empty.<br />Let’s get saucy!</p>
            </div>
          ) : (
            cart.map((l) => {
              const item = findItem(l.id)!;
              return (
                <div className="cart-item" key={l.key}>
                  <div className="emo">{item.emoji}</div>
                  <div className="info">
                    <h4>{item.name}</h4>
                    <small>{describeLine(l)}</small>
                    <div className="line">
                      <div className="qty">
                        <button onClick={() => changeQty(l.key, -1)} aria-label="Decrease">−</button>
                        <b>{l.qty}</b>
                        <button onClick={() => changeQty(l.key, 1)} aria-label="Increase">+</button>
                      </div>
                      <b>{rs(l.price * l.qty)}</b>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="drawer-foot">
          {subtotal > 0 && remaining > 0 && (
            <p className="hint">Add {rs(remaining)} more for FREE delivery 🛵</p>
          )}
          <div className="row"><span>Subtotal</span><b>{rs(subtotal)}</b></div>
          <div className="row"><span>Delivery</span><b>{delivery ? rs(delivery) : "FREE"}</b></div>
          <div className="row total"><span>Total</span><b>{rs(total)}</b></div>
          <button
            type="button"
            className="btn btn-yellow full"
            disabled={!cart.length}
            onClick={() => { setDrawerOpen(false); setCheckoutOpen(true); }}
          >
            Checkout »
          </button>
        </div>
      </aside>
    </>
  );
}
