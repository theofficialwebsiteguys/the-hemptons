import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-page-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-skeleton">
      <div class="product-skeleton__gallery">
        <div class="skeleton product-skeleton__main"></div>
        <div class="product-skeleton__thumbs">
          @for (item of [1, 2, 3, 4]; track item) {
            <div class="skeleton product-skeleton__thumb"></div>
          }
        </div>
      </div>
      <div class="product-skeleton__info">
        <div class="skeleton product-skeleton__title"></div>
        <div class="skeleton product-skeleton__price"></div>
        <div class="skeleton product-skeleton__line"></div>
        <div class="skeleton product-skeleton__line"></div>
        <div class="skeleton product-skeleton__cta"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .product-skeleton {
        display: grid;
        gap: 2rem;
        grid-template-columns: 1fr;
      }

      @media (min-width: 768px) {
        .product-skeleton {
          grid-template-columns: 1.1fr 1fr;
          gap: 3rem;
        }
      }

      .product-skeleton__main {
        aspect-ratio: 4 / 5;
        width: 100%;
      }

      .product-skeleton__thumbs {
        display: flex;
        gap: 0.75rem;
        margin-top: 0.75rem;
      }

      .product-skeleton__thumb {
        width: 4.5rem;
        height: 4.5rem;
      }

      .product-skeleton__info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 0.5rem;
      }

      .product-skeleton__title {
        height: 2rem;
        width: 70%;
      }

      .product-skeleton__price {
        height: 1.25rem;
        width: 30%;
      }

      .product-skeleton__line {
        height: 1rem;
        width: 100%;
      }

      .product-skeleton__cta {
        height: 3rem;
        width: 60%;
        margin-top: 1rem;
      }
    `
  ]
})
export class ProductPageSkeletonComponent {}
