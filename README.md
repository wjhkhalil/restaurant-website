# Sauce Guys — Restaurant Website (Next.js)

Online menu and ordering site for Sauce Guys. Customers build an order (sizes, extras, flavours), and checkout sends the full order to the restaurant's WhatsApp.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Edit the menu, prices, phone and branches

Everything lives in **`lib/menu.ts`**:

- `CONFIG`: restaurant name, UAN, WhatsApp number (format `92XXXXXXXXXX`), delivery fee, free-delivery limit, branches
- `MENU`: every item, with `price` or `sizes`, optional `flavours` and `tag`
- `EXTRAS`: pizza extras priced per size

Items marked "verify" in the comments were hard to read on the printed menu, so check them.

## Publish (Vercel, free)

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com, click **New Project** and import the repo. Leave the default settings and deploy.
3. Under **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to your domain (e.g. `https://sauceguys.pk`).
4. Optional: add your custom domain under **Settings → Domains**.

Netlify and Cloudflare also support Next.js. Any Node host works with `npm run build && npm start`.

## Project structure

```
app/          layout (fonts, SEO), page, globals.css, sitemap, robots, icon, 404
components/   Header, Hero, Marquee, Deals, MenuSection, ItemModal, CartDrawer,
              CheckoutModal, Branches, Footer, Toast, CartContext (cart state)
lib/menu.ts   menu data + config
static-version/  earlier plain HTML version (can be deleted)
```
