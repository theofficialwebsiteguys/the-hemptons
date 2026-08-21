/**
 * Client-specific commerce configuration. This is the primary file you edit
 * when duplicating this project for a new client — nothing else in
 * core/ or features/ should need to change.
 *
 * The Angular app never talks to Shopify directly and never holds a
 * Storefront Access Token. Every request goes to your own backend API
 * wrapper at `${apiBaseUrl}/${storeKey}/...`, which holds the real Shopify
 * credentials server-side.
 */
export interface StorefrontConfig {
  /** Identifies this client's store to the backend API wrapper. */
  storeKey: string;
  /** Base URL of the backend API wrapper, without the store key. */
  apiBaseUrl: string;
}

// Real Shopify store: h5niuh-zj.myshopify.com ("The Hemptons"), served
// through the shared Shopify-API backend wrapper (../Shopify-API in this
// same Repos folder) — see its config/stores.local.json for the "hemptons"
// store entry. Run that service (`npm run dev`, defaults to port 3000)
// alongside this app for real data.
export const STOREFRONT_CONFIG: StorefrontConfig = {
  storeKey: 'hemptons',
  apiBaseUrl: 'http://localhost:3000/api/v1'
};
