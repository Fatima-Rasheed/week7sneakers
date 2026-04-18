# SNEAKER — Full-Stack Nike-Style E-Commerce

A full-stack e-commerce application built with Next.js (App Router), NestJS, RTK Query, MUI, and Hygraph CMS.

---

## Architecture

```
frontend/   → Next.js 16 (App Router) + RTK Query + MUI
backend/    → NestJS + graphql-request
CMS         → Hygraph (headless CMS, backend-only access)
```

**Data flow:**
```
Hygraph CMS → NestJS (GraphQL) → REST API → RTK Query → React UI
```

---

## Phase 1: Hygraph CMS Setup

1. Create a free account at [hygraph.com](https://hygraph.com)
2. Create a new project
3. Go to **Schema** → Add a new model called `Product` with these fields:

| Field       | Type        | Notes                    |
|-------------|-------------|--------------------------|
| name        | Single line | Required                 |
| slug        | Slug        | Required, unique         |
| price       | Float       | Required                 |
| category    | Single line | e.g. "Sneakers", "Run"   |
| description | Multi line  | Optional                 |
| image       | Asset       | Product photo            |

4. Go to **Content** → Add at least 3–5 products
5. Go to **Project Settings → API Access**:
   - Copy the **Content API** endpoint URL
   - Generate a **Permanent Auth Token** with read access
   - Set API permissions to allow public read (or use the token)

---

## Phase 2: Backend Setup

```bash
cd backend
cp .env .env.local   # or edit .env directly
```

Edit `backend/.env`:
```env
HYGRAPH_URL=https://your-region.cdn.hygraph.com/content/your-project-id/master
HYGRAPH_TOKEN=your-permanent-auth-token
PORT=4000
```

Install and run:
```bash
npm install
npm run start:dev
```

Backend runs at **http://localhost:4000**

### Available endpoints:
| Method | Path                        | Description          |
|--------|-----------------------------|----------------------|
| GET    | /products                   | List all products    |
| GET    | /products/:slug             | Get single product   |
| GET    | /cart?sessionId=xxx         | Get cart             |
| POST   | /cart/add                   | Add item to cart     |
| PATCH  | /cart/update                | Update item quantity |
| DELETE | /cart/remove/:productId     | Remove item          |
| DELETE | /cart/clear                 | Clear cart           |

---

## Phase 3: Frontend Setup

```bash
cd frontend
```

Edit `frontend/.env.local` (already created):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Install and run:
```bash
npm install
npm run dev
```

Frontend runs at **http://localhost:3000**

---

## Project Structure

```
frontend/
  src/
    app/
      page.tsx          → Home page (hero, products, categories, promos)
      cart/page.tsx     → Cart page
      layout.tsx        → Root layout with providers
    components/
      Navbar.tsx        → Sticky navbar with cart badge
      HeroBanner.tsx    → Hero section with ticker tape
      ProductSection.tsx → Horizontal scrollable product row
      ProductCard.tsx   → Individual product card with Add to Cart
      CategorySection.tsx → Workout / Run / Football categories
      PromoSection.tsx  → Discount banners
      MembershipBanner.tsx → Nike membership CTA
      Footer.tsx        → Footer with links and swoosh
      MuiThemeProvider.tsx → Client-side MUI theme wrapper
    services/
      api.ts            → RTK Query API slice (all endpoints)
    store/
      store.ts          → Redux store
      StoreProvider.tsx → Redux Provider wrapper
    theme/
      theme.ts          → MUI theme configuration

backend/
  src/
    products/
      products.module.ts
      products.service.ts   → Fetches from Hygraph via GraphQL
      products.controller.ts → GET /products, GET /products/:slug
    cart/
      cart.module.ts
      cart.service.ts       → In-memory cart (Map keyed by sessionId)
      cart.controller.ts    → Cart CRUD endpoints
    app.module.ts
    main.ts               → CORS enabled, port 4000
```

---

## Rules Compliance

| Rule | Status |
|------|--------|
| ❌ No hardcoded products | ✅ All products from Hygraph |
| ❌ No frontend Hygraph calls | ✅ Only NestJS calls Hygraph |
| ❌ No localStorage cart | ✅ Cart stored in NestJS memory |
| ❌ No direct fetch/axios in components | ✅ RTK Query only |
| ❌ No checkout flow | ✅ Checkout button disabled |
| ✅ App Router | ✅ Used |
| ✅ RTK Query for all APIs | ✅ Used |
| ✅ MUI for all UI | ✅ Used |

---

## Testing the Flow

1. Start backend: `cd backend && npm run start:dev`
2. Start frontend: `cd frontend && npm run dev`
3. Open http://localhost:3000
4. Products load from Hygraph via NestJS
5. Click **+** on any product card → added to cart
6. Click cart icon → navigate to `/cart`
7. Use **+** / **−** buttons to adjust quantity
8. Click trash icon to remove items
9. Refresh page → cart reloads from backend
