import type { Metadata, Viewport } from "next";
import { Anton, Poppins } from "next/font/google";
import { CartProvider } from "@/components/CartContext";
import { CONFIG } from "@/lib/menu";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl),
  title: `${CONFIG.name} | Detroit Pizza, Burgers & Wings`,
  description:
    "Order Detroit-style pizza, crunchy burgers, oven-baked wings and loaded fries from Sauce Guys. Takeaway and fast home delivery.",
  keywords: ["Sauce Guys", "Detroit pizza", "zinger burger", "wings bucket", "loaded fries", "food delivery Rawalpindi Islamabad"],
  openGraph: {
    title: `${CONFIG.name} — ${CONFIG.tagline}`,
    description: "Detroit-style pizzas, burgers, wings & fries. Order online for delivery or takeaway.",
    type: "website",
    locale: "en_PK",
  },
};

export const viewport: Viewport = { themeColor: "#1f8f3a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${poppins.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
