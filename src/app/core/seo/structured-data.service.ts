import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { SITE_CONFIG } from '../../config/site.config';
import { Product } from '../models/product.model';
import { Collection } from '../models/collection.model';

type JsonLd = Record<string, unknown>;

const SCRIPT_ID = 'structured-data';

/**
 * Injects a single JSON-LD <script> tag per page. Call one of the helpers
 * below from a route component; each call replaces the previous script so
 * navigating between pages never stacks up stale structured data.
 */
@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  private readonly document = inject(DOCUMENT);

  organization(): void {
    this.render({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.businessName,
      url: SITE_CONFIG.seo.siteUrl,
      sameAs: Object.values(SITE_CONFIG.social).filter(Boolean)
    });
  }

  website(): void {
    this.render({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.businessName,
      url: SITE_CONFIG.seo.siteUrl
    });
  }

  breadcrumbs(items: { name: string; path: string }[]): void {
    this.render({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${SITE_CONFIG.seo.siteUrl}${item.path}`
      }))
    });
  }

  product(product: Product): void {
    this.render({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: product.images.map((img) => img.url),
      sku: product.variants[0]?.sku ?? undefined,
      brand: product.vendor ? { '@type': 'Brand', name: product.vendor } : undefined,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: product.priceRange.minVariantPrice.currencyCode,
        lowPrice: product.priceRange.minVariantPrice.amount,
        highPrice: product.priceRange.maxVariantPrice.amount,
        availability: product.availableForSale
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        url: `${SITE_CONFIG.seo.siteUrl}/products/${product.handle}`
      }
    });
  }

  collection(collection: Collection): void {
    this.render({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: collection.title,
      description: collection.description ?? undefined,
      url: `${SITE_CONFIG.seo.siteUrl}/collections/${collection.handle}`
    });
  }

  clear(): void {
    this.document.getElementById(SCRIPT_ID)?.remove();
  }

  private render(data: JsonLd): void {
    this.clear();
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = SCRIPT_ID;
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }
}
