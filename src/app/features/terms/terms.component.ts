import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../config/site.config';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container section prose-page">
      <span class="eyebrow prose-page__eyebrow">Legal</span>
      <h1>Terms of Service</h1>

      <p class="text-muted">
        {{ site.fullName }}'s full terms of service have not been finalized yet.
      </p>
      <span class="prose-page__todo">TODO — replace with real terms of service</span>
    </div>
  `
})
export class TermsComponent {
  protected readonly site = SITE_CONFIG;

  constructor() {
    inject(SeoService).update({ title: 'Terms of Service', path: '/terms' });
  }
}
