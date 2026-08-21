import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="error-state" role="alert">
      <h3>{{ title() }}</h3>
      <p class="text-muted">{{ message() }}</p>
      @if (retryable()) {
        <app-button variant="secondary" (click)="retry.emit()">Try again</app-button>
      }
    </div>
  `,
  styles: [
    `
      .error-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        text-align: center;
        padding: 4rem 1.5rem;
      }
    `
  ]
})
export class ErrorStateComponent {
  readonly title = input('Something went wrong');
  readonly message = input("We couldn't load this content. Please try again.");
  readonly retryable = input(true);

  readonly retry = output<void>();
}
