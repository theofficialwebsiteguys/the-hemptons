# Shopify Angular Storefront Starter

A reusable, production-ready base for building **fully custom Angular storefronts** on top of Shopify. This is
**not** a Shopify theme — there is no Liquid, no Shopify-hosted frontend, and no Storefront Access Token anywhere in
this codebase. Shopify is used purely as a commerce backend (products, collections, variants, inventory, cart,
checkout, orders); the entire UI is a standalone Angular application.

## 1. What this project is

A copy-and-rebrand starter. Duplicate this folder for each new client, edit two config files and the design
tokens, drop in their content/branding, and start building their storefront — the architecture (routing, state,
API layer, components) doesn't change between clients.

## 2. Angular frontend architecture

- Angular 19, standalone components (no NgModules), the modern `@if`/`@for`/`@switch` control-flow syntax, and
  Angular Signals for state.
- Routes are lazy-loaded per feature (`app.routes.ts`) via `loadComponent()`.
- Folder layout:
  - `core/` — API client, DTOs, mappers, domain models, services, signal-based state, SEO. Nothing client-specific
    lives here.
  - `shared/` — reusable, presentational components (product card, cart line item, icons, skeletons, etc.) with no
    knowledge of routes or app-wide state.
  - `features/` — one folder per route/page (home, shop, product, collections, search, contact, account, about).
  - `layout/` — header, footer, announcement bar, mobile menu, cart drawer — the app shell around every page.
  - `config/` — the two files you edit per client (see below).
- No NgRx. State lives in small, focused `@Injectable({ providedIn: 'root' })` services that expose Angular
  Signals (`CartStateService`, `UiStateService`).

## 3. Shopify / commerce architecture

```
Angular Storefront  →  https://api.example.com/api/v1/{storeKey}/...  →  Shopify Storefront GraphQL API
```

The Angular app never talks to Shopify directly. It talks to your own backend API wrapper, which holds the real
Shopify Storefront Access Token and does the GraphQL work. This repo assumes (and was built against) a wrapper
exposing:

```
GET    /health
GET    /api/v1/:storeKey/products?search=&collection=&limit=&cursor=&availableOnly=
GET    /api/v1/:storeKey/products/:handle
GET    /api/v1/:storeKey/collections
GET    /api/v1/:storeKey/collections/:handle?limit=
POST   /api/v1/:storeKey/cart                        { lines: [{ variantId, quantity }] }
GET    /api/v1/:storeKey/cart/:cartId
POST   /api/v1/:storeKey/cart/:cartId/lines           { variantId, quantity }
PATCH  /api/v1/:storeKey/cart/:cartId/lines/:lineId   { quantity }
DELETE /api/v1/:storeKey/cart/:cartId/lines/:lineId
```

## 4. Why Shopify credentials are never in the frontend

A Storefront Access Token shipped in a browser bundle is public the moment the app loads — anyone can read it from
DevTools. Keeping it server-side (in the API wrapper) means the token, rate limiting, and any future
admin-level operations stay behind infrastructure you control. The Angular app only ever needs to know its
`storeKey` and the wrapper's base URL.

## 5. How the backend API wrapper is called

All commerce requests go through `core/api/storefront-api.service.ts`, which builds every URL as
`${apiBaseUrl}/${storeKey}/...`. Feature services (`ProductService`, `CollectionService`, `CartApiService`) call
this — never `HttpClient` directly — so no component or service ever assembles a URL by hand.

Raw API responses are typed as DTOs (`core/api/dto/*.ts`) and converted to the app's domain models
(`core/models/*.ts`) by a mapper layer (`core/mappers/*.ts`). **If the backend's JSON shape changes, you only edit
the DTO + mapper — never the components.**

## 6. Where to change the store key / API URL

`src/app/config/storefront.config.ts`:

```ts
export const STOREFRONT_CONFIG: StorefrontConfig = {
  storeKey: 'demo-store',
  apiBaseUrl: 'http://localhost:3000/api/v1'
};
```

## 7. Where to change branding / content

`src/app/config/site.config.ts` — business name, tagline, description, contact info, social links, nav, the
announcement bar, and SEO defaults (title suffix, default description/OG image, site URL).

## 8. Where to change global styles

`src/styles/` holds the design system:

- `_variables.scss` — colors, type scale, spacing, radii, shadows, breakpoints (all Sass variables, and mirrored as
  CSS custom properties in `src/styles.scss` under `:root` so runtime theming is possible without a rebuild).
- `_mixins.scss`, `_reset.scss`, `_typography.scss`, `_buttons.scss`, `_forms.scss`, `_utilities.scss`.

Component SCSS files can `@use 'variables' as v;` directly (no relative path needed — see
`angular.json` → `stylePreprocessorOptions.includePaths`).

## 9. How to run locally

```bash
npm install
npm start        # ng serve, http://localhost:4200
```

By default `environment.useMockData` is `false`, so it expects a commerce API running at
`storefront.config.ts`'s `apiBaseUrl`. To run the UI without a backend at all, set:

```ts
// src/environments/environment.ts
export const environment = { production: false, useMockData: true };
```

This switches `ProductService` / `CollectionService` / `CartApiService` to read from
`src/assets/mock/products.json` and `collections.json`, with a small in-memory mock cart
(`core/services/mock-cart.store.ts`) so add-to-cart, quantity changes, and the drawer all work with no backend.

## 10. How to build for production

```bash
npm run build     # outputs to dist/shopify-angular-starter
```

`environment.production.ts` is swapped in automatically via the `production` build configuration's
`fileReplacements` in `angular.json`.

## 11. Creating a new client store

```bash
cp -r shopify-angular-starter client-name
cd client-name
npm install
```

Then:

1. Change `storeKey` in `src/app/config/storefront.config.ts`.
2. Change `apiBaseUrl` if this client's wrapper is deployed elsewhere.
3. Update `src/app/config/site.config.ts` (business name, nav, contact, social, announcement bar).
4. Replace `src/assets/images` / `src/assets/icons` with the client's real assets.
5. Update design tokens in `src/styles/_variables.scss` (and the mirrored CSS vars in `src/styles.scss`).
6. Customize the homepage sections in `src/app/features/home/sections/` (copy, and swap/remove sections).
7. Point `storefront.config.ts` at the client's real store and test the products/collections endpoints.
8. Test the cart: add, update quantity, remove, confirm the drawer and persisted cart ID work.
9. Test checkout: confirm `cart.checkoutUrl` redirects to a real Shopify checkout.
10. Build and deploy (`npm run build`, then ship `dist/shopify-angular-starter`).

## Persistent cart

The Shopify cart ID is stored in `localStorage` under a store-scoped key —
`storefront_{storeKey}_cart_id` — so two client copies running locally never collide. On load,
`CartStateService.initializeCart()` reads that key, tries to fetch the cart, and silently clears the stored ID if
the cart is missing or expired (a 404 from the wrapper). A new cart is only created lazily, the first time
`addItem()` is called with no existing cart.

## Checkout

`cart.checkoutUrl` — returned by the backend wrapper — is treated as the only source of truth for checkout. The
cart drawer's Checkout button does a full-page redirect (`window.location.href = checkoutUrl`) to Shopify's hosted
checkout. The frontend never accepts a checkout URL from anywhere else (e.g. user input) and never attempts to
rebuild Shopify's checkout flow itself.

## Mock / development mode

See section 9 above. Useful for building UI before a Shopify store/wrapper is ready, or for local development
when the backend is down.

## Future extensibility

The architecture intentionally leaves room for, without implementing: customer accounts, wishlist, loyalty,
discount codes, predictive search, recommendations, recently viewed, reviews, subscriptions, analytics/GTM/Meta
Pixel/Klaviyo, Shopify customer accounts, a custom CMS, a store locator, and multi-location inventory. `core/guards`
and `core/interceptors` exist as empty, ready-to-use folders for when auth or request-level concerns (e.g. an auth
token interceptor) are needed.

## Assumptions made

- The backend wrapper's JSON contract matches `core/api/dto/*.ts` (mirrors a reference Express + Shopify Storefront
  GraphQL wrapper: cart mutations are `POST /cart`, `POST /cart/:id/lines`, `PATCH /cart/:id/lines/:lineId`, and
  `DELETE /cart/:id/lines/:lineId`). If your wrapper's contract differs, only `core/api/dto/*.ts` and
  `core/mappers/*.ts` need to change.
- The products endpoint has no `sort` query param yet, so `ShopComponent`'s sort UI applies a client-side sort to
  whatever page of products the API returns. "Newest" is a no-op until the API exposes a sortable date field —
  this was deliberately not invented.
- No contact-form or newsletter backend exists yet; `ContactService` and the homepage newsletter section resolve
  locally with a `TODO` marking where a real endpoint should be wired in.
