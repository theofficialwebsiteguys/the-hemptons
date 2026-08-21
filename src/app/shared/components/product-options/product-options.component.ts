import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { Product, ProductVariant } from '../../../core/models/product.model';

/**
 * Renders one button group per Shopify product option (Size, Color,
 * Flavor, Pack Size, ...) using whatever `product.options` contains —
 * option names are never hardcoded. Resolves the matching variant from the
 * combination of selected values and emits it on every change.
 */
@Component({
  selector: 'app-product-options',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-options.component.html',
  styleUrl: './product-options.component.scss'
})
export class ProductOptionsComponent {
  readonly product = input.required<Product>();
  readonly variantChange = output<ProductVariant | null>();

  private readonly selectedSignal = signal<Record<string, string>>({});
  private lastProductId: string | null = null;

  readonly selectedVariant = computed<ProductVariant | null>(() => {
    const selected = this.selectedSignal();
    return (
      this.product().variants.find((variant) =>
        variant.selectedOptions.every((option) => selected[option.name] === option.value)
      ) ?? null
    );
  });

  constructor() {
    effect(() => {
      const product = this.product();
      if (product.id === this.lastProductId) return;
      this.lastProductId = product.id;

      const initialVariant = product.variants.find((v) => v.availableForSale) ?? product.variants[0];
      const initial: Record<string, string> = {};
      initialVariant?.selectedOptions.forEach((option) => (initial[option.name] = option.value));
      this.selectedSignal.set(initial);
    });

    effect(() => {
      this.variantChange.emit(this.selectedVariant());
    });
  }

  isSelected(optionName: string, value: string): boolean {
    return this.selectedSignal()[optionName] === value;
  }

  isAvailable(optionName: string, value: string): boolean {
    const candidate = { ...this.selectedSignal(), [optionName]: value };
    return this.product().variants.some(
      (variant) =>
        variant.availableForSale && variant.selectedOptions.every((option) => candidate[option.name] === option.value)
    );
  }

  select(optionName: string, value: string): void {
    this.selectedSignal.update((current) => ({ ...current, [optionName]: value }));
  }
}
