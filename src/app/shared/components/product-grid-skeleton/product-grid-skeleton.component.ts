import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ProductCardSkeletonComponent } from '../product-card-skeleton/product-card-skeleton.component';

@Component({
  selector: 'app-product-grid-skeleton',
  standalone: true,
  imports: [ProductCardSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid">
      @for (item of placeholders(); track item) {
        <app-product-card-skeleton />
      }
    </div>
  `
})
export class ProductGridSkeletonComponent {
  readonly count = input(8);
  protected readonly placeholders = computed(() => Array.from({ length: this.count() }, (_, i) => i));
}
