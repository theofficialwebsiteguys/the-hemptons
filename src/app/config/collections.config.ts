/**
 * Maps the storefront's editorial categories (glass / apparel / mood mats /
 * featured) onto real Shopify collection handles. Nothing in the UI should
 * ever hardcode a handle string directly — always read it from here, so
 * reconnecting a collection later is a one-line config change.
 *
 * A blank handle means "not created in Shopify yet." Every component that
 * consumes these must treat an empty string / missing collection as a
 * normal, graceful empty state — never an error.
 */
export interface CollectionsConfig {
  /** Collector Glass — one-of-one and limited pieces. */
  glass: string;
  apparel: string;
  moodMats: string;
  /**
   * General catalog / "shop the latest" pull-through on the homepage. No
   * general "shop all" collection exists in Shopify yet — leave blank and
   * the homepage falls back to a plain product list instead of erroring.
   */
  featured: string;
}

export const COLLECTIONS_CONFIG: CollectionsConfig = {
  glass: 'glass',
  apparel: 'apparel',
  moodMats: 'mood-mats',
  featured: ''
};
