import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container section prose-page">
      <span class="eyebrow prose-page__eyebrow">Support</span>
      <h1>Shipping &amp; Returns</h1>

      <h2>Shipping</h2>
      <p class="text-muted">Processing times, carriers, and regional restrictions have not been finalized yet.</p>
      <span class="prose-page__todo">TODO — replace with real shipping policy</span>

      <h2>Returns</h2>
      <p class="text-muted">
        See the <a routerLink="/returns">Returns page</a> for our return policy.
      </p>
    </div>
  `
})
export class ShippingComponent {
  constructor() {
    inject(SeoService).update({ title: 'Shipping & Returns', path: '/shipping' });
  }
}
