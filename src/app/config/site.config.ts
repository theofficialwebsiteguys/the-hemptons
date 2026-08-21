/**
 * Client-facing brand/content configuration. Edit this alongside
 * storefront.config.ts when duplicating the project for a new client.
 */
export interface NavigationLink {
  label: string;
  route: string;
}

export interface AnnouncementBarConfig {
  enabled: boolean;
  text: string;
  link?: string;
}

export interface AgeGateConfig {
  /** Off by default. Flip on if this store requires an age check at entry. */
  enabled: boolean;
  minimumAge: number;
}

export interface SiteConfig {
  /** Short brand name — header wordmark, footer, nav. */
  businessName: string;
  shortName: string;
  /** Full legal/marketing name — About page, footer fine print, structured data. */
  fullName: string;
  established: number;
  tagline: string;
  description: string;

  contact: {
    email: string;
    phone: string;
    address?: string;
  };

  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
  };

  navigation: NavigationLink[];

  announcementBar: AnnouncementBarConfig;

  ageGate: AgeGateConfig;

  seo: {
    defaultTitle: string;
    titleSuffix: string;
    defaultDescription: string;
    defaultOgImage: string;
    siteUrl: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  businessName: 'The Hemptons',
  shortName: 'The Hemptons',
  fullName: 'The Hemptons Cannabis Co.',
  established: 2023,
  tagline: 'Goods for a higher standard.',
  description: 'Apparel, mood mats, and one-of-one collector glass from The Hemptons Cannabis Co.',

  // TODO(client): replace with the real support inbox/phone/address before launch.
  contact: {
    email: 'hello@thehemptons.com',
    phone: ''
  },

  // TODO(client): add real social links — left empty rather than guessed so
  // the footer doesn't point visitors at placeholder profiles.
  social: {},

  navigation: [
    { label: 'Shop', route: '/shop' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' }
  ],

  announcementBar: {
    enabled: true,
    text: 'THE HEMPTONS — EST. 2023',
    link: '/shop'
  },

  ageGate: {
    enabled: false,
    minimumAge: 21
  },

  seo: {
    defaultTitle: 'The Hemptons Cannabis Co.',
    titleSuffix: ' | The Hemptons Cannabis Co.',
    defaultDescription: 'Apparel, mood mats, and one-of-one collector glass from The Hemptons Cannabis Co. Est. 2023.',
    defaultOgImage: '/assets/images/hemptons/brand/og-default.jpg',
    siteUrl: 'https://thehemptons.com'
  }
};
