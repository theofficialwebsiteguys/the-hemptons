import { ChangeDetectionStrategy, Component, ElementRef, effect, signal, viewChild } from '@angular/core';
import { SITE_CONFIG } from '../../config/site.config';
import { ButtonComponent } from '../../shared/components/button/button.component';

const STORAGE_KEY = 'hemptons_age_confirmed';

/**
 * Off by default (see site.config.ts ageGate.enabled). When turned on, this
 * blocks the page behind a confirmation until the visitor confirms they
 * meet the configured minimum age — stored in localStorage so it only asks
 * once per browser. Makes no legal claim about whether an age gate is
 * required; that's a client/legal decision, this just implements it.
 */
@Component({
  selector: 'app-age-gate',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './age-gate.component.html',
  styleUrl: './age-gate.component.scss'
})
export class AgeGateComponent {
  protected readonly config = SITE_CONFIG.ageGate;
  protected readonly site = SITE_CONFIG;

  protected readonly visible = signal(this.config.enabled && !this.isConfirmed());
  protected readonly declined = signal(false);

  private readonly confirmButton = viewChild('confirmButton', { read: ElementRef<HTMLElement> });

  constructor() {
    effect(() => {
      if (this.visible()) {
        queueMicrotask(() => this.confirmButton()?.nativeElement.querySelector('button')?.focus());
      }
    });
  }

  confirm(): void {
    this.setConfirmed();
    this.visible.set(false);
  }

  decline(): void {
    this.declined.set(true);
  }

  private isConfirmed(): boolean {
    try {
      return typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private setConfirmed(): void {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Storage unavailable (e.g. private browsing) — the gate will simply ask again next visit.
    }
  }
}
