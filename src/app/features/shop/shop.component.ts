import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

import { ProductService } from '../../core/services/product.service';
import { CollectionService } from '../../core/services/collection.service';
import { SeoService } from '../../core/seo/seo.service';
import { Product, SortOption } from '../../core/models/product.model';
import { Collection } from '../../core/models/collection.model';
import { sortProducts, SORT_OPTIONS } from '../../core/utilities/sort-products.util';

import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { ProductGridSkeletonComponent } from '../../shared/components/product-grid-skeleton/product-grid-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ProductGridComponent,
    ProductGridSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  private readonly productService = inject(ProductService);
  private readonly collectionService = inject(CollectionService);
  private readonly seo = inject(SeoService);
  private readonly fb = new FormBuilder();

  protected readonly sortOptions = SORT_OPTIONS;

  protected readonly filtersForm = this.fb.nonNullable.group({
    search: '',
    collection: '',
    availableOnly: false
  });

  protected readonly sort = signal<SortOption>('featured');
  protected readonly collections = signal<Collection[]>([]);

  private readonly rawProducts = signal<Product[]>([]);
  protected readonly products = computed(() => sortProducts(this.rawProducts(), this.sort()));

  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  constructor() {
    this.seo.update({ title: 'Shop', path: '/shop' });

    this.collectionService.getCollections().subscribe((collections) => this.collections.set(collections));

    this.filtersForm.valueChanges
      .pipe(
        startWith(null),
        map(() => this.filtersForm.getRawValue()),
        debounceTime(300),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntilDestroyed()
      )
      .subscribe((values) => this.fetchProducts(values));
  }

  setSort(value: SortOption): void {
    this.sort.set(value);
  }

  retry(): void {
    this.fetchProducts(this.filtersForm.getRawValue());
  }

  private fetchProducts(values: { search: string; collection: string; availableOnly: boolean }): void {
    this.loading.set(true);
    this.error.set(false);

    this.productService
      .getProducts({
        search: values.search || undefined,
        collection: values.collection || undefined,
        availableOnly: values.availableOnly || undefined,
        limit: 48
      })
      .subscribe({
        next: (result) => {
          this.rawProducts.set(result.products);
          this.loading.set(false);
        },
        error: () => {
          this.rawProducts.set([]);
          this.loading.set(false);
          this.error.set(true);
        }
      });
  }
}
