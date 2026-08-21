# Hemptons image assets

All current product/collection/editorial photography for this build is served
live from the Shopify CDN (uploaded on the Product/Collection records in
Shopify Admin) — see `src/app/config/editorial-images.config.ts` for the
homepage editorial images and `src/assets/mock/products.json` for the mock
product fixtures, both of which reference those same CDN URLs.

Nothing under `src/assets/images/` is required for the app to run. These
folders exist as the drop-in location for any *additional* static brand
assets that shouldn't live in Shopify (e.g. a favicon source, an OG default
image, a vector wordmark if one gets designed) — organize by type:

- `brand/` — logo files, favicon source, default OG/social share image
- `lifestyle/` — general brand/atmosphere photography not tied to one product
- `glass/` — Collector Glass photography (no products yet — see
  `src/app/config/collections.config.ts`, `collections.glass`)
- `mood-mats/` — additional Mood Mat photography beyond what's on Shopify
- `apparel/` — apparel photography (black/white tee, front/back) — **none
  exists yet**; the live "The Hemptons T-Shirt" product has zero images and
  no Color option configured in Shopify. Upload real photography there
  first (or here, and reference it manually) to replace the branded
  placeholder currently shown on the apparel feature section and product
  cards.

If a file lands in one of these folders, reference it as
`/assets/images/hemptons/<folder>/<file>` — the build copies everything
under `src/assets/` to the output as-is (see `angular.json`).
