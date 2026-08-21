import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../config/site.config';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container section prose-page">
      <span class="eyebrow prose-page__eyebrow">Legal</span>
      <h1>Privacy Policy</h1>

      <p class="text-muted">
        {{ site.fullName }}'s full privacy policy — what data is collected, how it's used, and customer rights —
        has not been finalized yet.
      </p>
      <span class="prose-page__todo">TODO — replace with real privacy policy</span>
    </div>
  `
})
export class PrivacyComponent {
  protected readonly site = SITE_CONFIG;

  constructor() {
    inject(SeoService).update({ title: 'Privacy Policy', path: '/privacy' });
  }
}
