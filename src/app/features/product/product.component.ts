import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { ProductService } from '../../core/services/product.service';
import { CartStateService } from '../../core/state/cart-state.service';
import { SeoService } from '../../core/seo/seo.service';
import { StructuredDataService } from '../../core/seo/structured-data.service';
import { Product, ProductVariant } from '../../core/models/product.model';
import { formatMoney } from '../../core/models/money.model';

import { ProductGalleryComponent } from '../../shared/components/product-gallery/product-gallery.component';
import { ProductOptionsComponent } from '../../shared/components/product-options/product-options.component';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector/quantity-selector.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ProductPageSkeletonComponent } from '../../shared/components/product-page-skeleton/product-page-skeleton.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ProductGalleryComponent,
    ProductOptionsComponent,
    QuantitySelectorComponent,
    ButtonComponent,
    BreadcrumbComponent,
    ProductPageSkeletonComponent,
    ErrorStateComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  protected readonly cartState = inject(CartStateService);
  private readonly seo = inject(SeoService);
  private readonly structuredData = inject(StructuredDataService);

  protected readonly formatMoney = formatMoney;

  protected readonly product = signal<Product | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  protected readonly selectedVariant = signal<ProductVariant | null>(null);
  protected readonly quantity = signal(1);
  protected readonly adding = signal(false);

  /** True only when every variant is capped at exactly one unit — real inventory, never a fabricated claim. */
  protected readonly isLastOne = computed(() => {
    const p = this.product();
    if (!p || !p.availableForSale || !p.variants.length) return false;
    return p.variants.every((v) => v.quantityAvailable !== null && v.quantityAvailable <= 1);
  });

  constructor() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.loading.set(true);
          this.error.set(false);
          const handle = params.get('handle')!;
          return this.productService.getProductByHandle(handle);
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (product) => {
          this.product.set(product);
          this.quantity.set(1);
          this.loading.set(false);

          this.seo.update({
            title: product.title,
            description: product.description,
            image: product.featuredImage?.url,
            path: `/products/${product.handle}`,
            type: 'product'
          });
          this.structuredData.product(product);
          this.structuredData.breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            { name: product.title, path: `/products/${product.handle}` }
          ]);
        },
        error: () => {
          this.product.set(null);
          this.loading.set(false);
          this.error.set(true);
        }
      });

    effect(() => {
      if (!this.cartState.loading() && this.adding()) {
        this.adding.set(false);
      }
    });
  }

  onVariantChange(variant: ProductVariant | null): void {
    this.selectedVariant.set(variant);
  }

  onQuantityChange(quantity: number): void {
    this.quantity.set(quantity);
  }

  addToCart(): void {
    const variant = this.selectedVariant();
    if (!variant || !variant.availableForSale) return;

    this.adding.set(true);
    this.cartState.addItem(variant.id, this.quantity());
  }
}
