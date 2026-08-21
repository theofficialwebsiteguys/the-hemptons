import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { ProductService } from '../../core/services/product.service';
import { SeoService } from '../../core/seo/seo.service';
import { Product } from '../../core/models/product.model';

import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { ProductGridSkeletonComponent } from '../../shared/components/product-grid-skeleton/product-grid-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ProductGridComponent,
    ProductGridSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    IconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly seo = inject(SeoService);

  protected readonly searchControl = new FormControl('', { nonNullable: true });

  protected readonly results = signal<Product[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal(false);
  protected readonly searched = signal(false);

  constructor() {
    this.seo.update({ title: 'Search', path: '/search' });

    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const query = params.get('q') ?? '';
      if (this.searchControl.value !== query) {
        this.searchControl.setValue(query, { emitEvent: false });
      }
      this.fetch(query);
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { q: value || null },
          queryParamsHandling: 'merge'
        });
      });
  }

  private fetch(query: string): void {
    if (!query.trim()) {
      this.results.set([]);
      this.searched.set(false);
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(false);
    this.searched.set(true);

    this.productService.getProducts({ search: query, limit: 24 }).subscribe({
      next: (result) => {
        this.results.set(result.products);
        this.loading.set(false);
      },
      error: () => {
        this.results.set([]);
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }
}
