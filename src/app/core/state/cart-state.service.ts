import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

import { STOREFRONT_CONFIG } from '../../config/storefront.config';
import { ApiError } from '../api/api-error';
import { CartApiService } from '../services/cart-api.service';
import { Cart, CartLine } from '../models/cart.model';

/**
 * Owns the Shopify cart lifecycle end to end: persistence, restoration on
 * load, and every mutation. Components call addItem()/updateQuantity()/
 * removeItem() — never CartApiService directly — so the cart backend can
 * change without touching a single template.
 */
@Injectable({ providedIn: 'root' })
export class CartStateService {
  private readonly cartApi = inject(CartApiService);
  private readonly platformId = inject(PLATFORM_ID);

  /** Namespaced per store so copied storefronts never collide in local dev. */
  private readonly storageKey = `storefront_${STOREFRONT_CONFIG.storeKey}_cart_id`;

  private readonly cartSignal = signal<Cart | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly drawerOpenSignal = signal(false);
  private readonly initializedSignal = signal(false);

  readonly cart = this.cartSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isDrawerOpen = this.drawerOpenSignal.asReadonly();

  readonly cartLines = computed<CartLine[]>(() => this.cartSignal()?.lines ?? []);
  readonly cartQuantity = computed(() => this.cartSignal()?.totalQuantity ?? 0);
  readonly cartSubtotal = computed(() => this.cartSignal()?.cost.subtotalAmount ?? null);
  readonly checkoutUrl = computed(() => this.cartSignal()?.checkoutUrl ?? null);
  readonly isEmpty = computed(() => this.cartLines().length === 0);

  /** Called once, typically from AppComponent, to restore a persisted cart. */
  initializeCart(): void {
    if (this.initializedSignal()) return;
    this.initializedSignal.set(true);

    const existingId = this.readStoredCartId();
    if (!existingId) return;

    this.loadingSignal.set(true);
    this.cartApi
      .getCart(existingId)
      .pipe(
        catchError((err) => {
          if (err instanceof ApiError && err.isNotFound) {
            this.clearStoredCartId();
          }
          return of(null);
        })
      )
      .subscribe((cart) => {
        if (cart) this.cartSignal.set(cart);
        this.loadingSignal.set(false);
      });
  }

  addItem(variantId: string, quantity = 1): void {
    this.errorSignal.set(null);
    this.loadingSignal.set(true);

    const cartId = this.cartSignal()?.id ?? this.readStoredCartId();
    const request$ = cartId
      ? this.cartApi.addLine(cartId, variantId, quantity)
      : this.cartApi.createCart(variantId, quantity);

    request$
      .pipe(
        tap((cart) => this.storeCartId(cart.id)),
        catchError(() => {
          this.errorSignal.set("We couldn't add that item to your cart. Please try again.");
          return of(null);
        })
      )
      .subscribe((cart) => {
        if (cart) {
          this.cartSignal.set(cart);
          this.drawerOpenSignal.set(true);
        }
        this.loadingSignal.set(false);
      });
  }

  updateQuantity(lineId: string, quantity: number): void {
    const cartId = this.cartSignal()?.id;
    if (!cartId) return;

    this.errorSignal.set(null);
    this.loadingSignal.set(true);

    this.cartApi
      .updateLine(cartId, lineId, quantity)
      .pipe(
        catchError(() => {
          this.errorSignal.set("We couldn't update that item. Please try again.");
          return of(null);
        })
      )
      .subscribe((cart) => {
        if (cart) this.cartSignal.set(cart);
        this.loadingSignal.set(false);
      });
  }

  removeItem(lineId: string): void {
    const cartId = this.cartSignal()?.id;
    if (!cartId) return;

    this.errorSignal.set(null);
    this.loadingSignal.set(true);

    this.cartApi
      .removeLine(cartId, lineId)
      .pipe(
        catchError(() => {
          this.errorSignal.set("We couldn't remove that item. Please try again.");
          return of(null);
        })
      )
      .subscribe((cart) => {
        if (cart) this.cartSignal.set(cart);
        this.loadingSignal.set(false);
      });
  }

  clearCart(): void {
    this.cartSignal.set(null);
    this.clearStoredCartId();
  }

  openDrawer(): void {
    this.drawerOpenSignal.set(true);
  }

  closeDrawer(): void {
    this.drawerOpenSignal.set(false);
  }

  toggleDrawer(): void {
    this.drawerOpenSignal.update((open) => !open);
  }

  private readStoredCartId(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(this.storageKey);
  }

  private storeCartId(id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.storageKey, id);
  }

  private clearStoredCartId(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem(this.storageKey);
  }
}
