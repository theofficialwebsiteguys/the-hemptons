import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo/seo.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

/**
 * Placeholder route — wire up Shopify customer accounts here when the
 * client needs sign-in, order history, or saved addresses. See the
 * "Future Extensibility" notes in the README.
 */
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container section">
      <app-empty-state
        title="Accounts are coming soon"
        message="Customer sign-in and order history aren't wired up in this starter yet."
      />
    </div>
  `
})
export class AccountComponent {
  constructor() {
    inject(SeoService).update({ title: 'Account', path: '/account' });
  }
}
