"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { CONFIG, EXTRAS, findItem, unitPrice, type SizeLabel } from "@/lib/menu";

export interface CartLine {
  key: string;
  id: string;
  size: SizeLabel | null;
  flavour: string | null;
  extras: string[];
  price: number;
  qty: number;
}

export type OrderMode = "Delivery" | "Takeaway";

interface CartState {
  cart: CartLine[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  mode: OrderMode;
  setMode: (m: OrderMode) => void;
  add: (opts: { id: string; size?: SizeLabel | null; flavour?: string | null; extras?: string[]; qty?: number }) => void;
  changeQty: (key: string, delta: number) => void;
  clear: () => void;
  // UI state
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
  selectedId: string | null;
  openItem: (id: string) => void;
  closeItem: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
  bump: number;
}

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = "sg-cart";

export function describeLine(l: Pick<CartLine, "size" | "flavour" | "extras">) {
  const parts: string[] = [];
  if (l.size) parts.push(l.size);
  if (l.flavour) parts.push(l.flavour);
  if (l.extras.length) parts.push("+ " + l.extras.map((x) => EXTRAS.find((e) => e.id === x)?.name ?? x).join(", "));
  return parts.join(" · ");
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState<OrderMode>("Delivery");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [bump, setBump] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load saved cart after mount (avoids hydration mismatch)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      // Drop lines whose item no longer exists on the menu
      if (Array.isArray(saved)) setCart(saved.filter((l: CartLine) => findItem(l.id)));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch {}
  }, [cart, loaded]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }, []);

  const add: CartState["add"] = useCallback(({ id, size = null, flavour = null, extras = [], qty = 1 }) => {
    const item = findItem(id);
    if (!item) return;
    const sorted = [...extras].sort();
    const key = [id, size, flavour, ...sorted].join("|");
    const price = unitPrice(item, size, sorted);
    setCart((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { key, id, size, flavour, extras: sorted, price, qty }];
    });
    setBump((b) => b + 1);
    showToast(`✅ ${item.name} added`);
  }, [showToast]);

  const changeQty = useCallback((key: string, delta: number) => {
    setCart((prev) => prev.map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0));
  }, []);

  const openItem = useCallback((id: string) => {
    const item = findItem(id);
    if (!item) return;
    // Items without options go straight to the cart
    if (!item.sizes && !item.flavours) add({ id });
    else setSelectedId(id);
  }, [add]);

  const value = useMemo<CartState>(() => {
    const subtotal = cart.reduce((s, l) => s + l.price * l.qty, 0);
    const delivery = subtotal === 0 || mode === "Takeaway" || subtotal >= CONFIG.freeDeliveryAbove ? 0 : CONFIG.deliveryFee;
    return {
      cart, subtotal, delivery, total: subtotal + delivery,
      count: cart.reduce((s, l) => s + l.qty, 0),
      mode, setMode, add, changeQty, clear: () => setCart([]),
      drawerOpen, setDrawerOpen, checkoutOpen, setCheckoutOpen,
      selectedId, openItem, closeItem: () => setSelectedId(null),
      toast, showToast, bump,
    };
  }, [cart, mode, add, changeQty, drawerOpen, checkoutOpen, selectedId, openItem, toast, showToast, bump]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
