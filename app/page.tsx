import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Deals from "@/components/Deals";
import MenuSection from "@/components/MenuSection";
import Branches from "@/components/Branches";
import Footer from "@/components/Footer";
import ItemModal from "@/components/ItemModal";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import Toast from "@/components/Toast";
import { CONFIG, MENU, basePrice } from "@/lib/menu";

// Structured data so Google can show the restaurant & menu in search
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: CONFIG.name,
  servesCuisine: ["Pizza", "Burgers", "Fast Food"],
  telephone: CONFIG.uan,
  url: CONFIG.siteUrl,
  hasMenu: {
    "@type": "Menu",
    hasMenuItem: MENU.map((m) => ({
      "@type": "MenuItem",
      name: m.name,
      description: m.desc,
      offers: { "@type": "Offer", price: basePrice(m), priceCurrency: "PKR" },
    })),
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Deals />
        <MenuSection />
        <Branches />
      </main>
      <Footer />
      <ItemModal />
      <CartDrawer />
      <CheckoutModal />
      <Toast />
    </>
  );
}
