import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CartLine } from '../../../core/models/cart.model';
import { formatMoney } from '../../../core/models/money.model';
import { ImageComponent } from '../image/image.component';
import { QuantitySelectorComponent } from '../quantity-selector/quantity-selector.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-cart-line-item',
  standalone: true,
  imports: [ImageComponent, QuantitySelectorComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-line-item.component.html',
  styleUrl: './cart-line-item.component.scss'
})
export class CartLineItemComponent {
  readonly line = input.required<CartLine>();

  readonly quantityChange = output<number>();
  readonly remove = output<void>();

  readonly formatMoney = formatMoney;

  variantLabel(): string {
    const options = this.line().merchandise.selectedOptions;
    if (!options.length) return this.line().merchandise.title;
    return options.map((o) => o.value).join(' / ');
  }
}
