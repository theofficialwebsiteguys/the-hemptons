import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        @for (item of items(); track item.label; let last = $last) {
          <li>
            @if (item.path && !last) {
              <a [routerLink]="item.path">{{ item.label }}</a>
            } @else {
              <span aria-current="page">{{ item.label }}</span>
            }
            @if (!last) {
              <app-icon name="chevron-right" [size]="14" />
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [
    `
      .breadcrumb ol {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.4rem;
        font-size: 0.8rem;
      }

      .breadcrumb li {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--color-muted, #6b6b6b);
      }

      .breadcrumb a:hover {
        color: var(--color-text, #171717);
      }

      .breadcrumb span[aria-current] {
        color: var(--color-text, #171717);
      }
    `
  ]
})
export class BreadcrumbComponent {
  readonly items = input<BreadcrumbItem[]>([]);
}
