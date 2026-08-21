import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../config/site.config';

@Component({
  selector: 'app-announcement-bar',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (announcement.enabled) {
      <div class="announcement-bar">
        @if (announcement.link) {
          <a [routerLink]="announcement.link">{{ announcement.text }}</a>
        } @else {
          <span>{{ announcement.text }}</span>
        }
      </div>
    }
  `,
  styles: [
    `
      .announcement-bar {
        background-color: var(--color-surface-dark, #212b1f);
        color: var(--color-text-on-dark, #f4eeda);
        text-align: center;
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        padding: 0.55rem 1rem;
      }
    `
  ]
})
export class AnnouncementBarComponent {
  protected readonly announcement = SITE_CONFIG.announcementBar;
}
