import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container section prose-page">
      <span class="eyebrow prose-page__eyebrow">Support</span>
      <h1>Returns</h1>

      <p class="text-muted">Return window, condition requirements, and refund method have not been finalized yet.</p>
      <span class="prose-page__todo">TODO — replace with real returns policy</span>

      <h2>Questions</h2>
      <p class="text-muted">
        Reach out on the <a routerLink="/contact">contact page</a> before sending anything back.
      </p>
    </div>
  `
})
export class ReturnsComponent {
  constructor() {
    inject(SeoService).update({ title: 'Returns', path: '/returns' });
  }
}
