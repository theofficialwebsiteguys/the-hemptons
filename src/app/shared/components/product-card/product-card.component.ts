import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { formatMoney, isMoneyGreaterThan } from '../../../core/models/money.model';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, ImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  readonly product = input.required<Product>();

  protected readonly hovered = signal(false);

  readonly priceLabel = computed(() => {
    const { minVariantPrice, maxVariantPrice } = this.product().priceRange;
    if (minVariantPrice.amount === maxVariantPrice.amount) return formatMoney(minVariantPrice);
    return `From ${formatMoney(minVariantPrice)}`;
  });

  readonly compareAtLabel = computed(() => {
    const compareRange = this.product().compareAtPriceRange;
    if (!compareRange) return null;
    if (!isMoneyGreaterThan(compareRange.minVariantPrice, this.product().priceRange.minVariantPrice)) return null;
    return formatMoney(compareRange.minVariantPrice);
  });

  readonly isOnSale = computed(() => this.compareAtLabel() !== null);

  /** True only when every variant is capped at exactly one unit — a real, data-driven signal, never a fabricated one. */
  readonly isLastOne = computed(() => {
    const variants = this.product().variants;
    if (!variants.length) return false;
    return variants.every((v) => v.quantityAvailable !== null && v.quantityAvailable <= 1) && this.product().availableForSale;
  });

  readonly displayImage = computed(() => {
    const images = this.product().images;
    if (this.hovered() && images.length > 1) return images[1];
    return this.product().featuredImage;
  });
}
