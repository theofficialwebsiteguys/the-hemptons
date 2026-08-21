import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { CollectionService } from '../../core/services/collection.service';
import { SeoService } from '../../core/seo/seo.service';
import { StructuredDataService } from '../../core/seo/structured-data.service';
import { CollectionWithProducts } from '../../core/models/collection.model';
import { COLLECTIONS_CONFIG } from '../../config/collections.config';
import { COLLECTION_EDITORIAL } from '../../config/content.config';

import { ImageComponent } from '../../shared/components/image/image.component';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { ProductGridSkeletonComponent } from '../../shared/components/product-grid-skeleton/product-grid-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [
    ImageComponent,
    ProductGridComponent,
    ProductGridSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    BreadcrumbComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss'
})
export class CollectionDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly collectionService = inject(CollectionService);
  private readonly seo = inject(SeoService);
  private readonly structuredData = inject(StructuredDataService);

  protected readonly data = signal<CollectionWithProducts | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  /** Editorial heading/subheading override for this collection's configured role, falling back to Shopify's own title/description. */
  protected readonly editorialHeading = computed(() => {
    const handle = this.data()?.collection.handle;
    return this.editorialFor(handle)?.heading ?? this.data()?.collection.title ?? '';
  });

  protected readonly editorialSubheading = computed(() => {
    const handle = this.data()?.collection.handle;
    return this.editorialFor(handle)?.subheading ?? this.data()?.collection.description ?? null;
  });

  constructor() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.loading.set(true);
          this.error.set(false);
          return this.collectionService.getCollectionByHandle(params.get('handle')!);
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (data) => {
          this.data.set(data);
          this.loading.set(false);

          this.seo.update({
            title: data.collection.title,
            description: data.collection.description ?? undefined,
            image: data.collection.image?.url,
            path: `/collections/${data.collection.handle}`
          });
          this.structuredData.collection(data.collection);
          this.structuredData.breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Collections', path: '/collections' },
            { name: data.collection.title, path: `/collections/${data.collection.handle}` }
          ]);
        },
        error: () => {
          this.data.set(null);
          this.loading.set(false);
          this.error.set(true);
        }
      });
  }

  private editorialFor(handle: string | undefined): { heading: string; subheading: string } | null {
    if (!handle) return null;
    if (handle === COLLECTIONS_CONFIG.glass) return COLLECTION_EDITORIAL.glass;
    if (handle === COLLECTIONS_CONFIG.apparel) return COLLECTION_EDITORIAL.apparel;
    if (handle === COLLECTIONS_CONFIG.moodMats) return COLLECTION_EDITORIAL.moodMats;
    return null;
  }
}
