import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Collection } from '../../../core/models/collection.model';
import { CollectionCardComponent } from '../collection-card/collection-card.component';

@Component({
  selector: 'app-collection-grid',
  standalone: true,
  imports: [CollectionCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="collection-grid">
      @for (collection of collections(); track collection.id) {
        <app-collection-card [collection]="collection" />
      }
    </div>
  `,
  styles: [
    `
      .collection-grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: 1fr;
      }

      @media (min-width: 768px) {
        .collection-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .collection-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    `
  ]
})
export class CollectionGridComponent {
  readonly collections = input.required<Collection[]>();
}
