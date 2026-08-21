import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartStateService } from '../../core/state/cart-state.service';
import { CartLineItemComponent } from '../../shared/components/cart-line-item/cart-line-item.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { formatMoney } from '../../core/models/money.model';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CartLineItemComponent, EmptyStateComponent, ButtonComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent {
  protected readonly cartState = inject(CartStateService);
  protected readonly formatMoney = formatMoney;

  close(): void {
    this.cartState.closeDrawer();
  }

  onQuantityChange(lineId: string, quantity: number): void {
    if (quantity <= 0) {
      this.cartState.removeItem(lineId);
    } else {
      this.cartState.updateQuantity(lineId, quantity);
    }
  }

  goToCheckout(): void {
    const url = this.cartState.checkoutUrl();
    if (url) {
      window.location.href = url;
    }
  }
}
