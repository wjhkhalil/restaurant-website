import { CONFIG } from "@/lib/menu";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-text">
        <h1>
          BIG TASTE
          <br />
          <span>BIGGER</span>
          <br />
          SATISFACTION
        </h1>
        <p>
          Detroit-style pizzas, crunchy burgers, oven-baked wings and foot-long fries. Order for takeaway or fast home
          delivery.
        </p>
        <div className="hero-cta">
          <a href="#menu" className="btn btn-yellow">Order Now »</a>
          <a href={`tel:${CONFIG.uan.replace(/\D/g, "")}`} className="btn btn-outline">📞 Call UAN</a>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="burst">🍔</div>
        <div className="chip c1">🍕 Detroit Pizza</div>
        <div className="chip c2">🍗 Wings Bucket</div>
        <div className="chip c3">🍟 Foot Long Fries</div>
      </div>
    </section>
  );
}
