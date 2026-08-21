import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CollectionService } from '../../core/services/collection.service';
import { SeoService } from '../../core/seo/seo.service';
import { Collection } from '../../core/models/collection.model';
import { CollectionGridComponent } from '../../shared/components/collection-grid/collection-grid.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CollectionGridComponent, EmptyStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss'
})
export class CollectionsComponent {
  private readonly collectionService = inject(CollectionService);
  private readonly seo = inject(SeoService);

  protected readonly collections = signal<Collection[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  constructor() {
    this.seo.update({ title: 'Collections', path: '/collections' });
    this.load();
  }

  retry(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.error.set(false);

    this.collectionService.getCollections().subscribe({
      next: (collections) => {
        this.collections.set(collections);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }
}
