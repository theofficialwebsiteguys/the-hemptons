import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { STOREFRONT_CONFIG } from '../../config/storefront.config';
import { ApiError } from './api-error';

export type QueryParamValue = string | number | boolean | undefined | null;

/**
 * Single point of contact with the backend commerce API wrapper. Builds
 * every URL as `${apiBaseUrl}/${storeKey}/...` so no feature service or
 * component ever assembles a URL or references the store key directly.
 */
@Injectable({ providedIn: 'root' })
export class StorefrontApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${STOREFRONT_CONFIG.apiBaseUrl}/${STOREFRONT_CONFIG.storeKey}`;

  get<T>(path: string, params?: Record<string, QueryParamValue>): Observable<T> {
    return this.http
      .get<T>(this.buildUrl(path), { params: this.buildParams(params) })
      .pipe(catchError((err) => this.handleError(err)));
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(this.buildUrl(path), body).pipe(catchError((err) => this.handleError(err)));
  }

  put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>(this.buildUrl(path), body).pipe(catchError((err) => this.handleError(err)));
  }

  patch<T>(path: string, body: unknown): Observable<T> {
    return this.http.patch<T>(this.buildUrl(path), body).pipe(catchError((err) => this.handleError(err)));
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.buildUrl(path)).pipe(catchError((err) => this.handleError(err)));
  }

  private buildUrl(path: string): string {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${normalized}`;
  }

  private buildParams(params?: Record<string, QueryParamValue>): HttpParams {
    let httpParams = new HttpParams();
    if (!params) return httpParams;

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === '') continue;
      httpParams = httpParams.set(key, String(value));
    }
    return httpParams;
  }

  private handleError(error: HttpErrorResponse) {
    const status = error.status ?? 0;
    const message = error.error?.error || error.message || 'Something went wrong. Please try again.';
    return throwError(() => new ApiError(status, message, error.error?.details));
  }
}
