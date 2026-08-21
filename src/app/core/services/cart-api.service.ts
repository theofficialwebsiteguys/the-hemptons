import { Injectable, inject } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CartDto } from '../api/dto/cart.dto';
import { StorefrontApiService } from '../api/storefront-api.service';
import { mapCart } from '../mappers/cart.mapper';
import { Cart } from '../models/cart.model';
import { ApiError } from '../api/api-error';
import { MockCartStore } from './mock-cart.store';

/**
 * Raw cart operations against the backend wrapper:
 *   POST   /cart                        { lines: [{ variantId, quantity }] }
 *   GET    /cart/:cartId
 *   POST   /cart/:cartId/lines          { variantId, quantity }
 *   PATCH  /cart/:cartId/lines/:lineId  { quantity }
 *   DELETE /cart/:cartId/lines/:lineId
 *
 * CartStateService is the only consumer — components never call this
 * service directly, so the cart backend can change without touching UI.
 */
@Injectable({ providedIn: 'root' })
export class CartApiService {
  private readonly api = inject(StorefrontApiService);
  private readonly mockCart = inject(MockCartStore);

  createCart(variantId: string, quantity: number): Observable<Cart> {
    if (environment.useMockData) {
      return of(this.mockCart.create(variantId, quantity));
    }
    return this.api.post<CartDto>('/cart', { lines: [{ variantId, quantity }] }).pipe(map(mapCart));
  }

  getCart(cartId: string): Observable<Cart> {
    if (environment.useMockData) {
      const cart = this.mockCart.get(cartId);
      if (!cart) return this.throwNotFound();
      return of(cart);
    }
    return this.api.get<CartDto>(`/cart/${encodeURIComponent(cartId)}`).pipe(map(mapCart));
  }

  addLine(cartId: string, variantId: string, quantity: number): Observable<Cart> {
    if (environment.useMockData) {
      const cart = this.mockCart.addLine(cartId, variantId, quantity);
      if (!cart) return this.throwNotFound();
      return of(cart);
    }
    return this.api
      .post<CartDto>(`/cart/${encodeURIComponent(cartId)}/lines`, { variantId, quantity })
      .pipe(map(mapCart));
  }

  updateLine(cartId: string, lineId: string, quantity: number): Observable<Cart> {
    if (environment.useMockData) {
      const cart = this.mockCart.updateLine(cartId, lineId, quantity);
      if (!cart) return this.throwNotFound();
      return of(cart);
    }
    return this.api
      .patch<CartDto>(`/cart/${encodeURIComponent(cartId)}/lines/${encodeURIComponent(lineId)}`, { quantity })
      .pipe(map(mapCart));
  }

  removeLine(cartId: string, lineId: string): Observable<Cart> {
    if (environment.useMockData) {
      const cart = this.mockCart.removeLine(cartId, lineId);
      if (!cart) return this.throwNotFound();
      return of(cart);
    }
    return this.api
      .delete<CartDto>(`/cart/${encodeURIComponent(cartId)}/lines/${encodeURIComponent(lineId)}`)
      .pipe(map(mapCart));
  }

  private throwNotFound(): Observable<never> {
    return throwError(() => new ApiError(404, 'Cart not found or expired'));
  }
}
