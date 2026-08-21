import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-card-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-card-skeleton">
      <div class="skeleton product-card-skeleton__media"></div>
      <div class="skeleton product-card-skeleton__line"></div>
      <div class="skeleton product-card-skeleton__line product-card-skeleton__line--short"></div>
    </div>
  `,
  styles: [
    `
      .product-card-skeleton {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .product-card-skeleton__media {
        aspect-ratio: 4 / 5;
        width: 100%;
      }

      .product-card-skeleton__line {
        height: 0.9rem;
        width: 70%;
      }

      .product-card-skeleton__line--short {
        width: 40%;
      }
    `
  ]
})
export class ProductCardSkeletonComponent {}
