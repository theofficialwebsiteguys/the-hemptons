import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container section not-found">
      <h1>Page not found</h1>
      <p class="text-muted">The page you're looking for doesn't exist or has moved.</p>
      <a routerLink="/"><app-button>Back to home</app-button></a>
    </div>
  `,
  styles: [
    `
      .not-found {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        text-align: center;
        padding-block: 6rem;
      }
    `
  ]
})
export class NotFoundComponent {
  constructor() {
    inject(SeoService).update({ title: 'Page not found', path: '/404' });
  }
}
