import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid">
      @for (product of products(); track product.id) {
        <app-product-card [product]="product" />
      }
    </div>
  `
})
export class ProductGridComponent {
  readonly products = input.required<Product[]>();
}
