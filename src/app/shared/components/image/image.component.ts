import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ProductImage } from '../../../core/models/image.model';

/**
 * Renders a ProductImage with native lazy loading and a graceful fallback
 * when Shopify data is missing an image or the URL fails to load. The
 * fallback is a deliberate branded placeholder (not a blank grey box) so an
 * unphotographed product still reads as intentional — swap in real
 * photography and it disappears automatically.
 */
@Component({
  selector: 'app-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (image() && !errored()) {
      <img
        [src]="image()!.url"
        [attr.alt]="image()!.altText ?? altFallback()"
        [attr.width]="image()!.width"
        [attr.height]="image()!.height"
        [loading]="priority() ? 'eager' : 'lazy'"
        [attr.fetchpriority]="priority() ? 'high' : null"
        [style.object-fit]="fit()"
        (error)="errored.set(true)"
      />
    } @else {
      <div class="app-image__placeholder" [attr.aria-label]="altFallback()" role="img">
        <span class="app-image__mark" aria-hidden="true"></span>
        @if (altFallback()) {
          <span class="app-image__caption">{{ altFallback() }}</span>
        }
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
      }

      .app-image__placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 1rem;
        text-align: center;
        background: linear-gradient(155deg, var(--color-surface-alt, #e8dab9) 0%, var(--hemp-paper, #e8dab9) 100%);
      }

      .app-image__mark {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 999px;
        border: 1.5px solid var(--hemp-brown, #6f4f37);
        opacity: 0.4;
      }

      .app-image__mark::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 999px;
        border: 1px solid var(--hemp-brown, #6f4f37);
        transform: scale(0.6);
      }

      .app-image__caption {
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.04em;
        color: var(--hemp-brown, #6f4f37);
        opacity: 0.7;
        max-width: 14rem;
      }
    `
  ]
})
export class ImageComponent {
  readonly image = input<ProductImage | null | undefined>(null);
  readonly altFallback = input('');
  readonly fit = input<'cover' | 'contain'>('cover');
  readonly priority = input(false);

  readonly errored = signal(false);
}
