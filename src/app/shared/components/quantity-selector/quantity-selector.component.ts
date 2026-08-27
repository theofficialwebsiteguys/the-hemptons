import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="qty">
      <button
        type="button"
        class="qty__btn"
        [disabled]="quantity() <= min()"
        (click)="change(quantity() - 1)"
        aria-label="Decrease quantity"
      >
        <app-icon name="minus" [size]="16" />
      </button>
      <span class="qty__value" aria-live="polite">{{ quantity() }}</span>
      <button
        type="button"
        class="qty__btn"
        [disabled]="quantity() >= max()"
        (click)="change(quantity() + 1)"
        aria-label="Increase quantity"
      >
        <app-icon name="plus" [size]="16" />
      </button>
    </div>
  `,
  styles: [
    `
      .qty {
        display: inline-flex;
        align-items: center;
        border: 1px solid var(--color-border, #e5e3df);
        border-radius: 4px;
      }

      .qty__btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        color: var(--color-text, #171717);
        transition: background-color 150ms ease, color 150ms ease;
      }

      .qty__btn:hover:not(:disabled) {
        background-color: var(--color-surface-alt, #efece7);
        color: var(--hemp-orange, #b5622a);
      }

      .qty__btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }

      .qty__value {
        min-width: 2rem;
        text-align: center;
        font-variant-numeric: tabular-nums;
      }
    `
  ]
})
export class QuantitySelectorComponent {
  readonly quantity = input(1);
  readonly min = input(1);
  readonly max = input(99);

  readonly quantityChange = output<number>();

  change(next: number): void {
    if (next < this.min() || next > this.max()) return;
    this.quantityChange.emit(next);
  }
}
