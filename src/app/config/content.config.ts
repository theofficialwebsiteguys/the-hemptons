/**
 * Editorial copy for the homepage feature sections and collection page
 * headers. Centralized here (rather than hardcoded in each component
 * template) so a client content update never turns into a component edit.
 * Everything below is placeholder brand copy — safe to replace, structure
 * is meant to stay.
 */

export interface CtaContent {
  label: string;
  route: string;
}

export const HOME_CONTENT = {
  hero: {
    eyebrow: 'Est. 2023',
    headline: 'The Hemptons',
    subheadline: 'Goods for a higher standard.',
    body: 'Apparel, mood mats & one-of-one glass.',
    primaryCta: { label: 'Shop the Collection', route: '/shop' } as CtaContent
  },
  categories: {
    eyebrow: 'Shop',
    heading: 'Curated, not endless',
    glass: { label: 'Collector Glass', copy: 'One-of-one and limited.' },
    moodMats: { label: 'Mood Mats', copy: 'The Hemptons, under everything.' },
    apparel: { label: 'Apparel', copy: 'Wear the harvest.' }
  },
  glassStory: {
    eyebrow: 'Collector Glass',
    heading: 'Individual pieces. Limited drops.',
    body: 'No two drops are the same.',
    cta: { label: 'Explore Glass', route: '' } as CtaContent,
    emptyHeading: 'Collector Glass — coming soon',
    emptyBody: 'One-of-one and limited pieces are on the way. Check back soon.'
  },
  brandStory: {
    eyebrow: 'Est. 2023',
    heading: 'The Hemptons',
    body: 'Born from cannabis culture and built around the things we actually want to own, wear, and keep around.',
    cta: { label: 'Our Story', route: '/about' } as CtaContent
  },
  moodMats: {
    eyebrow: 'Signature Artwork',
    heading: 'Put the Hemptons down.',
    body: 'Our signature artwork, made for the setup.',
    cta: { label: 'View Mood Mats', route: '' } as CtaContent
  },
  apparel: {
    eyebrow: 'Apparel',
    heading: 'The uniform.',
    body: 'Hemptons apparel — original branding, everyday wear.',
    cta: { label: 'Shop Apparel', route: '' } as CtaContent
  },
  shopLatest: {
    eyebrow: 'Shop',
    heading: 'Shop the latest',
    viewAll: { label: 'View all', route: '/shop' } as CtaContent
  }
} as const;

/** Editorial header overrides for /collections/:handle, keyed by category role. */
export const COLLECTION_EDITORIAL: Record<'glass' | 'apparel' | 'moodMats', { heading: string; subheading: string }> = {
  glass: { heading: 'Collector Glass', subheading: 'Individual pieces. Limited drops.' },
  apparel: { heading: 'The Uniform', subheading: 'Wear the harvest.' },
  moodMats: { heading: 'Put It Down.', subheading: 'The Hemptons, under everything.' }
};

// TODO(client): brand copy drafted from the founder's own description of
// the concept (a Hamptons-inspired lifestyle brand for cannabis culture) —
// no specific history, people, or claims were invented. Swap in real
// detail (an actual founding story, names, milestones) whenever it exists;
// the structure below is built to take it without a redesign.
export const ABOUT_CONTENT = {
  eyebrow: 'Est. 2023',
  heading: 'The Hemptons',
  lede: 'A lifestyle cannabis brand — a play on the Hamptons, built with the same elegant, easygoing style.',
  body: [
    'Harvest-inspired badge artwork, warm neutral tones, and a look that feels more boutique than dispensary — the same care you would expect from any premium lifestyle brand, just built around cannabis.',
    'Apparel, mood mats, and one-of-one collector glass, made for anyone who wants their cannabis culture to feel just as elevated as everything else around it.'
  ]
} as const;
