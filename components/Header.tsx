"use client";

import { useCart } from "./CartContext";

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Sauce Guys home">
      <span>SAUCE</span>
      <b>GUYS</b>
    </a>
  );
}

export default function Header() {
  const { count, setDrawerOpen, bump } = useCart();
  return (
    <header className="nav">
      <Logo />
      <nav className="links">
        <a href="#menu">Menu</a>
        <a href="#deals">Deals</a>
        <a href="#branches">Branches</a>
        <a href="#contact">Contact</a>
      </nav>
      {/* key forces the bump animation to replay on every add */}
      <button key={bump} className={`cart-btn${bump ? " bump" : ""}`} onClick={() => setDrawerOpen(true)} aria-label="Open cart">
        🛒 <span>{count}</span>
      </button>
    </header>
  );
}
