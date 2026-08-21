/**
 * Infrastructure-level settings only (dev vs. prod). Client-specific store
 * identity lives in app/config/storefront.config.ts and app/config/site.config.ts
 * so a new client copy only ever touches the config/ folder, never this one.
 */
export const environment = {
  production: false,
  /**
   * When true, feature services read from src/assets/mock instead of the
   * API. Off — the Shopify-API backend wrapper is running locally and
   * configured with a real store entry (see storefront.config.ts). Flip
   * back to true for UI work when that backend isn't running.
   */
  useMockData: false
};
