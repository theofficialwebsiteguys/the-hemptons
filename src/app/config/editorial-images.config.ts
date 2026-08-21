import { ProductImage } from '../core/models/image.model';

/**
 * Editorial/marketing photography used in homepage storytelling sections —
 * distinct from product imagery, which always comes live from Shopify via
 * ProductService/CollectionService. These are the client's own real photos
 * and product renders, uploaded to Shopify Files, reused here for oversized
 * editorial placement rather than a product card.
 *
 * Each slot below is intentionally a DIFFERENT image — with a growing
 * library in Shopify Files, no photo should be doing double duty across
 * more than one section unless the brief specifically calls for it (e.g.
 * the "glass on a mood mat" shot deliberately bridging two categories).
 */
const BASE = 'https://cdn.shopify.com/s/files/1/1026/4818/5201/files/';

function image(file: string, altText: string, width = 2160, height = 2880): ProductImage {
  return { url: `${BASE}${file}`, altText, width, height };
}

export const EDITORIAL_IMAGES = {
  // --- Mood mat lifestyle photography (the client's own shoot) ---

  /** Hero background — mats catching afternoon sunlight, good negative space for header/copy overlay. */
  heroLifestyle: image('hemptons-lifestyle-sunlight.jpg?v=1784247431', 'Hemptons mood mats catching afternoon sunlight outdoors'),
  /** Mats styled on outdoor chairs around a table — used on the About page. */
  lifestyleChairs: image('hemptons-lifestyle-chairs.jpg?v=1784247431', 'Hemptons mood mats styled on outdoor chairs and a table'),
  /** Mats on a backyard deck — used on the About page hero. */
  lifestyleDeck: image('hemptons-lifestyle-deck.jpg?v=1784247431', 'Hemptons mood mats displayed on a backyard deck'),
  /** Four mats arranged on stone pavers, wide shot — category grid / mood mat feature. */
  lifestylePavers: image('hemptons-lifestyle-pavers.jpg?v=1784247431', 'Four Hemptons mood mats arranged on stone pavers'),
  /** Single mat, front-facing — the clearest shot of the full badge artwork. */
  matBadge: image('hemptons-mat-badge.jpg?v=1784247430', 'The Hemptons Cannabis Co. mood mat with vintage harvest badge artwork'),
  /** Close-up of the harvest badge artwork — a "logo as asset" moment. */
  artworkCloseup: image(
    'hemptons-artwork-closeup.jpg?v=1784247431',
    'Close-up of the Hemptons mood mat artwork — cannabis, wheat, pumpkins, and autumn leaves',
    2880,
    2160
  ),
  /** A generic glass piece resting on a mood mat — ties the Glass category to the brand without featuring one specific product. */
  bongOnMat: image('hemptons-hero-bong.jpg?v=1784247431', 'A glass piece displayed on a Hemptons mood mat'),
  /** Angled detail of stacked mats. */
  detailStack: image('hemptons-detail-stack.jpg?v=1784247431', 'Angled detail of stacked Hemptons mood mats'),
  /** Four mats fanned across an outdoor chair seat — mood mat feature secondary image. */
  matsFanned: image(
    'IMG_7605_fcfc8fe0-1f3d-40b4-99ae-a771df3a7ed0.jpg?v=1784245105',
    'Four Hemptons mood mats fanned across an outdoor chair seat'
  ),

  // --- Real product photography, reused editorially ---

  /** Illadelph Day of the Dead — #25 of 99, outdoor shot on a mood mat. Anchors the Collector Glass homepage feature. */
  glassIlladelph: image(
    '1_3eb16f55-d47e-4b77-81c0-ec735fe9e809.jpg?v=1787338142',
    'Illadelph Day of the Dead limited edition glass piece displayed on a Hemptons mood mat'
  ),
  /** Sovereignty Glass collector water pipe — clear beaker with fumed accents. */
  glassSovereignty: image('bong1-1.jpg?v=1787337993', 'Sovereignty Glass collector water pipe on a Hemptons mood mat'),
  /** The Hemptons T-Shirt — Black, angled product shot. */
  teeBlack: image('ChatGPTImageAug21_2026_02_36_13PM_4.png?v=1787337384', 'The Hemptons T-Shirt in black, chest logo detail', 1254, 1254),
  /** The Hemptons T-Shirt — White, angled product shot. */
  teeWhite: image('ChatGPTImageAug21_2026_02_40_07PM_4.png?v=1787337691', 'The Hemptons T-Shirt in white, chest logo detail', 1254, 1254)
} as const;
