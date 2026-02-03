# store2 — Next.js E‑Commerce (COD, Multi‑language, Admin)

A production‑ready starter for an eCommerce site with **Cash on Delivery (COD)** only, 
**multi-language UI (Arabic, French, English)**, a **CMS for pages**, a simple **Admin dashboard**, and **theme & logo** controls — all backed by **Prisma + PostgreSQL**.

## Features
- Storefront: Home, Shop, Product, Cart, Checkout (COD), Order Success
- Admin: Products, Orders, Pages (CMS), Appearance (theme colors, logo), Settings
- Theme controls with CSS variables (primary/secondary)
- Logo upload (local in dev)
- COD checkout flow (no external gateway)
- Prisma schema for products, orders, pages, settings
- i18n (ar, fr, en) with simple language switch

## Quick Start

```bash
# 1) Install deps
npm install

# 2) Configure env
cp .env.example .env
# Update DATABASE_URL and other values

# 3) Setup DB
npx prisma migrate dev --name init
npx prisma db seed

# 4) Run dev
npm run dev

# 5) Open
http://localhost:3000
```

### Admin Access
- Go to: `http://localhost:3000/admin-login`
- Use password from `.env` → `ADMIN_PASSWORD`

### Default Content
- An admin password and a few sample products/pages are seeded.

## Deploy
- PostgreSQL: Neon/Render
- Hosting: Vercel
- Storage: local in dev (S3/R2 in prod recommended; route ready to swap)

## License
MIT
