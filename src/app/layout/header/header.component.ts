import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { fromEvent, map, startWith } from 'rxjs';

import { SITE_CONFIG } from '../../config/site.config';
import { COLLECTIONS_CONFIG } from '../../config/collections.config';
import { CartStateService } from '../../core/state/cart-state.service';
import { UiStateService } from '../../core/state/ui-state.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface CategoryLink {
  label: string;
  route: string;
}

/** Matches "/", "", or either with a query string/fragment — never just an exact "/" string. */
function isHomepageUrl(url: string): boolean {
  const path = url.split(/[?#]/)[0];
  return path === '/' || path === '';
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected readonly site = SITE_CONFIG;
  protected readonly cartState = inject(CartStateService);
  protected readonly uiState = inject(UiStateService);

  private readonly router = inject(Router);

  /** Category links built from configured Shopify handles — a blank handle is simply omitted. */
  protected readonly categoryLinks: CategoryLink[] = [
    COLLECTIONS_CONFIG.glass && { label: 'Glass', route: `/collections/${COLLECTIONS_CONFIG.glass}` },
    COLLECTIONS_CONFIG.apparel && { label: 'Apparel', route: `/collections/${COLLECTIONS_CONFIG.apparel}` },
    COLLECTIONS_CONFIG.moodMats && { label: 'Mood Mats', route: `/collections/${COLLECTIONS_CONFIG.moodMats}` }
  ].filter((link): link is CategoryLink => !!link);

  private readonly isHomepage = signal(isHomepageUrl(this.router.url));
  private readonly scrolled = signal(typeof window !== 'undefined' ? window.scrollY > 40 : false);

  protected readonly transparent = computed(() => this.isHomepage() && !this.scrolled());

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomepage.set(isHomepageUrl(event.urlAfterRedirects));
      }
    });

    if (typeof window !== 'undefined') {
      fromEvent(window, 'scroll', { passive: true })
        .pipe(
          startWith(null),
          map(() => window.scrollY > 40),
          takeUntilDestroyed()
        )
        .subscribe((isScrolled) => this.scrolled.set(isScrolled));
    }
  }
}
