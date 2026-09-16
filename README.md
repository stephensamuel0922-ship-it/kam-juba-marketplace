# Kam Bi Kam? — Juba Fixed Price System

One fixed USD price per product, one central dollar rate, SSP price
calculated automatically for every shop. No shop can set its own price.

## How the price logic works

- `products.base_price_usd` — the ONE fixed price per product, set only by
  the admin. Never touched by shops.
- `settings.dollar_rate_ssp` — a single row, the day's dollar rate.
- `products_live_price` (a SQL view) — `calculated_ssp = base_price_usd *
  dollar_rate_ssp`, computed live, never stored per shop.
- `shop_products` — a shop only links itself to a product and flags
  in-stock/out-of-stock. **There is no price column here on purpose.**
- `set_dollar_rate(new_rate, admin_name)` — a SQL function the admin page
  calls. It updates the single rate and logs a new row per product into
  `prices_history` in one transaction, so every shop's displayed price
  changes the same second.

Row Level Security only lets the public (anon) key read prices and insert a
new shop/registration — it can never write a price. All price-affecting
writes (dollar rate, product prices, TOP approvals, shop verification) go
through `app/admin/actions.ts`, which uses the **service role** key on the
server and re-checks the admin password on every call.

## Setup

1. **Create a Supabase project** at supabase.com.
2. In the SQL editor, run `supabase_schema.sql` (this repo, root folder) —
   it creates every table, the price view, the rate-update function, RLS
   policies, and seeds ~14 products across 8 sample shops at a 4,500 SSP
   dollar rate. Add more shops the same way the seed does, or via `/post`.
3. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from
     Project Settings → API.
   - `SUPABASE_SERVICE_ROLE_KEY` — same page, the **secret** service key.
     Never commit this or expose it with `NEXT_PUBLIC_`.
   - `ADMIN_PASSWORD` — defaults to `juba2025` per the brief; change it.
   - `NEXT_PUBLIC_MOMO_NUMBER` / `NEXT_PUBLIC_MOMO_NAME` / `NEXT_PUBLIC_WHATSAPP`
     — pre-filled with `0926058145` (MTN — Steven) / `211926058145`.
4. Install and run:
   ```bash
   npm install
   npm run dev
   ```
5. Open `http://localhost:3000`. Admin panel is at `/admin`.

## Pages

- `/` — dollar rate bar, search, categories, cheapest-today grid.
- `/product/[id]` — fixed price, every shop selling it (same price, stock
  status, call/WhatsApp), price history table.
- `/post` — register a shop and tick which products it sells. No price
  field anywhere in this form.
- `/my-shop` — log in by phone, toggle stock per product, pay via MoMo to
  go TOP (opens the MoMo modal with `0926058145`, submits a TxID for admin
  approval).
- `/admin` (password-gated) — **Rate** tab to change the dollar rate for
  every product at once, **Products** tab to add products / edit a fixed
  USD price, **Shops** tab to verify shops, **Payments** tab to
  approve/reject pending TOP payments.
- `/how` — plain-language explainer in Juba Arabic + English.

## Notes / next steps

- `public/manifest.json` references `/icon-192.png` and `/icon-512.png` —
  drop in real app icons (yellow #FFD60A / black, per the brief) before
  shipping as a PWA; a service worker for offline caching isn't wired up
  yet.
- The admin password check is a lightweight per-request check, good for an
  MVP with one trusted admin. For multiple admins or stronger security,
  swap it for real auth (Supabase Auth) before wider rollout.
- `prices_history` is written automatically on every dollar-rate change
  and on every new product — that's what powers the 7-day chart on each
  product page.
- Reports/PDF export mentioned in the brief (`Juba Fixed Prices — Dollar
  4500 — Date`) isn't built yet; `listProducts()` in `app/admin/actions.ts`
  already returns everything needed to generate one.