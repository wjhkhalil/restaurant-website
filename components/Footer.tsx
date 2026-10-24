import { CONFIG } from "@/lib/menu";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div>
        <Logo />
        <p>For take away & fast home delivery</p>
      </div>
      <div>
        <p>UAN: <a href={`tel:${CONFIG.uan.replace(/\D/g, "")}`}><b>{CONFIG.uan}</b></a></p>
        <p>
          <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">💬 Order on WhatsApp</a>
        </p>
      </div>
      <p className="copy">© {new Date().getFullYear()} {CONFIG.name}. All rights reserved.</p>
    </footer>
  );
}
