import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty-state">
      <h3>{{ title() }}</h3>
      @if (message()) {
        <p class="text-muted">{{ message() }}</p>
      }
      <ng-content />
    </div>
  `,
  styles: [
    `
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        text-align: center;
        padding: 4rem 1.5rem;
      }
    `
  ]
})
export class EmptyStateComponent {
  readonly title = input('Nothing here yet');
  readonly message = input<string | undefined>(undefined);
}
