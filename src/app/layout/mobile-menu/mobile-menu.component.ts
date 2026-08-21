import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, Router, NavigationStart } from '@angular/router';
import { SITE_CONFIG } from '../../config/site.config';
import { COLLECTIONS_CONFIG } from '../../config/collections.config';
import { UiStateService } from '../../core/state/ui-state.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface CategoryLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {
  protected readonly site = SITE_CONFIG;
  protected readonly uiState = inject(UiStateService);

  protected readonly categoryLinks: CategoryLink[] = [
    COLLECTIONS_CONFIG.glass && { label: 'Glass', route: `/collections/${COLLECTIONS_CONFIG.glass}` },
    COLLECTIONS_CONFIG.apparel && { label: 'Apparel', route: `/collections/${COLLECTIONS_CONFIG.apparel}` },
    COLLECTIONS_CONFIG.moodMats && { label: 'Mood Mats', route: `/collections/${COLLECTIONS_CONFIG.moodMats}` }
  ].filter((link): link is CategoryLink => !!link);

  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      this.document.body.style.overflow = this.uiState.isMobileMenuOpen() ? 'hidden' : '';
    });

    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.uiState.closeMobileMenu();
      }
    });
  }

  close(): void {
    this.uiState.closeMobileMenu();
  }
}
