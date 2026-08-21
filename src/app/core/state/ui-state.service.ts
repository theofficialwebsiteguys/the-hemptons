import { Injectable, signal } from '@angular/core';

/**
 * Lightweight, app-wide UI state that doesn't warrant its own feature
 * module: the mobile off-canvas menu and the search overlay. Keeping this
 * separate from CartStateService means opening the menu never triggers
 * cart-related change detection and vice versa.
 */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  private readonly mobileMenuOpenSignal = signal(false);
  private readonly searchOpenSignal = signal(false);

  readonly isMobileMenuOpen = this.mobileMenuOpenSignal.asReadonly();
  readonly isSearchOpen = this.searchOpenSignal.asReadonly();

  openMobileMenu(): void {
    this.mobileMenuOpenSignal.set(true);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpenSignal.set(false);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpenSignal.update((open) => !open);
  }

  openSearch(): void {
    this.searchOpenSignal.set(true);
  }

  closeSearch(): void {
    this.searchOpenSignal.set(false);
  }

  toggleSearch(): void {
    this.searchOpenSignal.update((open) => !open);
  }
}
