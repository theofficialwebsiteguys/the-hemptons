import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'cart'
  | 'menu'
  | 'close'
  | 'search'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'plus'
  | 'minus'
  | 'trash'
  | 'check'
  | 'instagram'
  | 'facebook'
  | 'tiktok';

/**
 * Inline-SVG icon set. Avoids pulling in an icon package for a handful of
 * glyphs — add new cases here as the storefront needs them.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @switch (name()) {
        @case ('cart') {
          <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" />
          <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
        }
        @case ('menu') {
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        }
        @case ('close') {
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        }
        @case ('search') {
          <circle cx="10.5" cy="10.5" r="6.5" />
          <line x1="20" y1="20" x2="15.2" y2="15.2" />
        }
        @case ('chevron-left') {
          <polyline points="14.5 4.5 7 12 14.5 19.5" />
        }
        @case ('chevron-right') {
          <polyline points="9.5 4.5 17 12 9.5 19.5" />
        }
        @case ('chevron-down') {
          <polyline points="4.5 9.5 12 17 19.5 9.5" />
        }
        @case ('plus') {
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        }
        @case ('minus') {
          <line x1="5" y1="12" x2="19" y2="12" />
        }
        @case ('trash') {
          <polyline points="4 7 20 7" />
          <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
          <path d="M9 7V4h6v3" />
        }
        @case ('check') {
          <polyline points="4.5 12.5 9.5 17.5 19.5 6.5" />
        }
        @case ('instagram') {
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        }
        @case ('facebook') {
          <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5Z" />
        }
        @case ('tiktok') {
          <path
            d="M14 3.5c.6 1.9 2 3.2 4 3.4v3a6.7 6.7 0 0 1-4-1.3v6.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.07v3.1a2.6 2.6 0 1 0 1.8 2.5V3.5Z"
          />
        }
      }
    </svg>
  `
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(24);
}
