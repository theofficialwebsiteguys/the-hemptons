import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SITE_CONFIG } from '../../config/site.config';

export interface SeoData {
  title: string;
  description?: string;
  image?: string;
  /** Path only, e.g. "/products/classic-tee" — the site URL is prefixed automatically. */
  path?: string;
  type?: 'website' | 'product' | 'article';
}

/**
 * Centralizes document title, meta description, canonical URL, and Open
 * Graph tags. Call `update()` from a route component's constructor/effect
 * with page-specific data; anything omitted falls back to site.config.ts.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(data: SeoData): void {
    const fullTitle = data.title
      ? `${data.title}${SITE_CONFIG.seo.titleSuffix}`
      : SITE_CONFIG.seo.defaultTitle;
    const description = data.description ?? SITE_CONFIG.seo.defaultDescription;
    const image = data.image ?? SITE_CONFIG.seo.defaultOgImage;
    const url = `${SITE_CONFIG.seo.siteUrl}${data.path ?? ''}`;

    this.title.setTitle(fullTitle);

    this.setTag('name', 'description', description);
    this.setTag('property', 'og:title', fullTitle);
    this.setTag('property', 'og:description', description);
    this.setTag('property', 'og:image', this.toAbsoluteUrl(image));
    this.setTag('property', 'og:url', url);
    this.setTag('property', 'og:type', data.type ?? 'website');
    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', fullTitle);
    this.setTag('name', 'twitter:description', description);
    this.setTag('name', 'twitter:image', this.toAbsoluteUrl(image));

    this.setCanonicalUrl(url);
  }

  private setTag(attr: 'name' | 'property', key: string, content: string): void {
    if (!content) return;
    this.meta.updateTag({ [attr]: key, content });
  }

  private setCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private toAbsoluteUrl(pathOrUrl: string): string {
    if (pathOrUrl.startsWith('http')) return pathOrUrl;
    return `${SITE_CONFIG.seo.siteUrl}${pathOrUrl}`;
  }
}
