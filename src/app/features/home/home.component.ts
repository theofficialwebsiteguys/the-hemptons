import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { map } from 'rxjs';

import { ProductService } from '../../core/services/product.service';
import { CollectionService } from '../../core/services/collection.service';
import { COLLECTIONS_CONFIG } from '../../config/collections.config';
import { SeoService } from '../../core/seo/seo.service';
import { StructuredDataService } from '../../core/seo/structured-data.service';
import { Product } from '../../core/models/product.model';

import { HeroComponent } from './sections/hero/hero.component';
import { CategoryGridComponent } from './sections/category-grid/category-grid.component';
import { GlassStoryComponent } from './sections/glass-story/glass-story.component';
import { FeaturedProductsComponent } from './sections/featured-products/featured-products.component';
import { BrandStoryComponent } from './sections/brand-story/brand-story.component';
import { MoodMatFeatureComponent } from './sections/mood-mat-feature/mood-mat-feature.component';
import { ApparelFeatureComponent } from './sections/apparel-feature/apparel-feature.component';
import { NewsletterComponent } from './sections/newsletter/newsletter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    CategoryGridComponent,
    GlassStoryComponent,
    FeaturedProductsComponent,
    BrandStoryComponent,
    MoodMatFeatureComponent,
    ApparelFeatureComponent,
    NewsletterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-category-grid />
    <app-glass-story />
    <app-featured-products [products]="featuredProducts()" [loading]="loading()" />
    <app-brand-story />
    <app-mood-mat-feature />
    <app-apparel-feature />
    <app-newsletter />
  `
})
export class HomeComponent {
  private readonly productService = inject(ProductService);
  private readonly collectionService = inject(CollectionService);
  private readonly seo = inject(SeoService);
  private readonly structuredData = inject(StructuredDataService);

  readonly featuredProducts = signal<Product[]>([]);
  readonly loading = signal(true);

  constructor() {
    this.seo.update({ title: '', path: '/' });
    this.structuredData.organization();

    const featuredHandle = COLLECTIONS_CONFIG.featured;

    const products$ = featuredHandle
      ? this.collectionService.getCollectionByHandle(featuredHandle).pipe(map((result) => result.products))
      : this.productService.getProducts({ limit: 8 }).pipe(map((result) => result.products));

    products$.subscribe({
      next: (products) => {
        this.featuredProducts.set(products);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
