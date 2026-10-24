// ==== RESTAURANT CONFIG — edit these to match your real details ====
export const CONFIG = {
  name: "Sauce Guys",
  tagline: "Big Taste. Bigger Satisfaction.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sauceguys.pk",
  uan: "0319-4800636",
  whatsapp: "923194800636", // international format, no + or spaces
  deliveryFee: 100,
  freeDeliveryAbove: 2500,
  branches: [
    { name: "Gulzar-e-Quaid", address: "Near Meezan Bank, Gulzar-e-Quaid" },
    { name: "Ghauri Town", address: "Ghauri Town, Islamabad" },
    { name: "Defence Road", address: "Wings Mall backside, Defence Road, Rawalpindi" },
  ],
};

export type Category = "pizza" | "burgers" | "wings" | "fries" | "deals" | "drinks" | "dips";
export type SizeLabel = "Medium" | "Large";

export interface MenuItem {
  id: string;
  cat: Category;
  name: string;
  emoji: string;
  desc: string;
  tag?: string;
  price?: number;
  sizes?: { label: SizeLabel; price: number }[];
  flavours?: string[];
}

const pizzaSizes = [
  { label: "Medium" as const, price: 650 },
  { label: "Large" as const, price: 1550 },
];

// Prices/contents marked "verify" were hard to read on the printed menu.
export const MENU: MenuItem[] = [
  // ---- Detroit-style pizzas ----
  { id: "malai-boti", cat: "pizza", name: "Malai Boti", emoji: "🍕", tag: "Bestseller",
    desc: "Malai boti chunks, onion, mozzarella and creamy malai sauce.", sizes: pizzaSizes },
  { id: "double-beast", cat: "pizza", name: "Double Beast", emoji: "🍕", tag: "Loaded",
    desc: "Double chicken, onion, tomato, jalapeños, olives and a double cheese pull.", sizes: pizzaSizes },
  { id: "hot-peri-peri", cat: "pizza", name: "Hot Peri Peri", emoji: "🌶️", tag: "Spicy",
    desc: "Peri peri chicken, jalapeños, capsicum and peri peri drizzle.", sizes: pizzaSizes },
  { id: "tandoori-bbq", cat: "pizza", name: "Tandoori BBQ", emoji: "🔥",
    desc: "Smoky tandoori chicken, onion, capsicum and BBQ sauce.", sizes: pizzaSizes },
  { id: "detroit-fajita", cat: "pizza", name: "Detroit Fajita", emoji: "🍕",
    desc: "Fajita chicken, onion, capsicum, olives and Detroit special sauce.", sizes: pizzaSizes },
  { id: "detroit-tikka", cat: "pizza", name: "Detroit Tikka", emoji: "🍕",
    desc: "Chicken tikka, onion, tomato, olives and Detroit special sauce.", sizes: pizzaSizes },
  { id: "genz-crown", cat: "pizza", name: "GenZ Crown", emoji: "👑", tag: "Signature",
    desc: "Crown crust stuffed with kebabs and mozzarella, loaded with chicken and creamy sauce.",
    sizes: [{ label: "Large", price: 1650 }] },

  // ---- Burgers ----
  { id: "double-crunch", cat: "burgers", name: "Double Crunch", emoji: "🍔", tag: "Double",
    desc: "Two crispy fillets, cheese and signature sauce.", price: 450 },
  { id: "super-zinger", cat: "burgers", name: "Super Zinger", emoji: "🍔",
    desc: "Crispy zinger fillet, lettuce and mayo.", price: 460 },
  { id: "fillet-crunch", cat: "burgers", name: "Fillet Crunch", emoji: "🍔",
    desc: "Crunchy chicken fillet with house sauce.", price: 320 },
  { id: "chicken-chapli", cat: "burgers", name: "Chicken Chapli", emoji: "🍔",
    desc: "Desi chapli-style chicken patty with chutney.", price: 360 },

  // ---- Wings & nuggets ----
  { id: "oven-wings", cat: "wings", name: "Oven Baked Wings (6 pcs)", emoji: "🍗",
    desc: "Oven baked and tossed in your choice of flavour.", price: 420,
    flavours: ["Hot Wings", "Garlic Mayo Wings", "Spicy Mayo Wings"] },
  { id: "wings-bucket", cat: "wings", name: "Wings Bucket (10 pcs)", emoji: "🪣", tag: "Share",
    desc: "A bucket of wings in your favourite sauce.", price: 750,
    flavours: ["Thai Sweet Chillies", "Peri Peri Hot Wings", "Plain Hot Wings"] },
  { id: "nuggets", cat: "wings", name: "Chicken Nuggets (6 pcs)", emoji: "🍗",
    desc: "Golden, crispy and dippable.", price: 400 },

  // ---- Fries ----
  { id: "loaded-fries", cat: "fries", name: "Loaded Fries", emoji: "🍟", tag: "Cheesy",
    desc: "Fries smothered in cheese, chicken and sauces.", price: 650 },
  { id: "footlong-fries", cat: "fries", name: "Foot Long Fries", emoji: "🍟", tag: "1 ft",
    desc: "A full foot of fries, sauced and loaded.", price: 750 },
  { id: "plain-fries", cat: "fries", name: "Plain Fries", emoji: "🍟", desc: "Classic salted fries.", price: 300 },
  { id: "regular-fries", cat: "fries", name: "Regular Fries", emoji: "🍟", desc: "Regular portion.", price: 200 },

  // ---- Deals (verify contents) ----
  { id: "deal-1", cat: "deals", name: "Deal 1", emoji: "🎁", desc: "Fillet Crunch burger + regular fries + drink.", price: 620 },
  { id: "deal-2", cat: "deals", name: "Deal 2", emoji: "🎁", desc: "Super Zinger + regular fries + drink.", price: 920 },
  { id: "deal-3", cat: "deals", name: "Deal 3", emoji: "🎁", desc: "Chicken Chapli + regular fries + drink.", price: 600 },
  { id: "deal-4", cat: "deals", name: "Deal 4", emoji: "🎁", tag: "Best value", desc: "Double Crunch + fries + nuggets + drink.", price: 1100 },

  // ---- Drinks (verify prices) ----
  { id: "drink-345", cat: "drinks", name: "Soft Drink 345ml", emoji: "🥤", desc: "Chilled.", price: 50 },
  { id: "drink-15", cat: "drinks", name: "Soft Drink 1.5L", emoji: "🥤", desc: "For the table.", price: 260 },
  { id: "water-small", cat: "drinks", name: "Small Water", emoji: "💧", desc: "Mineral water.", price: 70 },

  // ---- Dips ----
  { id: "dip-pepper", cat: "dips", name: "Pepper Dip", emoji: "🥣", desc: "Creamy black pepper.", price: 70 },
  { id: "dip-detroit", cat: "dips", name: "Detroit Special Dip", emoji: "🥣", desc: "Our house sauce.", price: 70 },
  { id: "dip-malai", cat: "dips", name: "Malai Garlic Dip", emoji: "🥣", desc: "Rich garlic malai.", price: 70 },
  { id: "dip-chipotle", cat: "dips", name: "Chipotle Sauce", emoji: "🥣", desc: "Smoky and spicy.", price: 70 },
];

// Pizza extras, priced per size (verify against printed menu)
export const EXTRAS: { id: string; name: string; Medium: number; Large: number }[] = [
  { id: "cheese", name: "Extra Cheese", Medium: 100, Large: 150 },
  { id: "chicken", name: "Extra Chicken", Medium: 100, Large: 150 },
  { id: "sauce", name: "Extra Sauce", Medium: 50, Large: 70 },
];

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pizza", label: "Detroit Pizza" },
  { id: "burgers", label: "Burgers" },
  { id: "wings", label: "Wings & Nuggets" },
  { id: "fries", label: "Fries" },
  { id: "deals", label: "Deals" },
  { id: "drinks", label: "Drinks" },
  { id: "dips", label: "Dips" },
];

export const findItem = (id: string) => MENU.find((m) => m.id === id);
export const basePrice = (item: MenuItem) => (item.sizes ? item.sizes[0].price : item.price ?? 0);
export const rs = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;

export function unitPrice(item: MenuItem, size: SizeLabel | null, extras: string[]) {
  let p = item.sizes ? item.sizes.find((s) => s.label === size)?.price ?? item.sizes[0].price : item.price ?? 0;
  if (size) for (const x of extras) p += EXTRAS.find((e) => e.id === x)?.[size] ?? 0;
  return p;
}
