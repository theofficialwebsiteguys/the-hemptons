import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';

import { CollectionDto, CollectionWithProductsResponseDto } from '../api/dto/collection.dto';
import { ProductDto, ProductListResponseDto } from '../api/dto/product.dto';
import { ProductQueryParams } from '../models/product.model';
import { ApiError } from '../api/api-error';

/**
 * Serves the same DTO shapes the real backend returns, read from static
 * JSON fixtures. This lets ProductService/CollectionService stay identical
 * whether environment.useMockData is on or off — only the data source
 * changes, never the mapper or the components.
 */
@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  private products$?: Observable<ProductListResponseDto>;
  private collections$?: Observable<CollectionDto[]>;

  getProducts(params: ProductQueryParams): Observable<ProductListResponseDto> {
    return this.loadProducts().pipe(
      map((response) => {
        let products = response.products;

        if (params.search) {
          const term = params.search.toLowerCase();
          products = products.filter(
            (p) => p.title.toLowerCase().includes(term) || p.description?.toLowerCase().includes(term)
          );
        }
        if (params.collection) {
          products = products.filter((p) => p.collections?.includes(params.collection!));
        }
        if (params.availableOnly) {
          products = products.filter((p) => p.availableForSale);
        }
        if (params.limit) {
          products = products.slice(0, params.limit);
        }

        return { products, pageInfo: { hasNextPage: false, hasPreviousPage: false } };
      })
    );
  }

  getProductByHandle(handle: string): Observable<ProductDto> {
    return this.loadProducts().pipe(
      switchMap(({ products }) => {
        const product = products.find((p) => p.handle === handle);
        if (!product) {
          throw new ApiError(404, `Product "${handle}" not found`);
        }
        return of(product);
      })
    );
  }

  getCollections(): Observable<CollectionDto[]> {
    return this.loadCollections();
  }

  getCollectionByHandle(handle: string, limit = 100): Observable<CollectionWithProductsResponseDto> {
    return this.loadCollections().pipe(
      switchMap((collections) => {
        const collection = collections.find((c) => c.handle === handle);
        if (!collection) {
          throw new ApiError(404, `Collection "${handle}" not found`);
        }
        return this.getProducts({ collection: handle, limit }).pipe(
          map((response) => ({ collection, products: response.products }))
        );
      })
    );
  }

  private loadProducts(): Observable<ProductListResponseDto> {
    if (!this.products$) {
      this.products$ = this.http.get<ProductListResponseDto>('/assets/mock/products.json');
    }
    return this.products$;
  }

  private loadCollections(): Observable<CollectionDto[]> {
    if (!this.collections$) {
      this.collections$ = this.http.get<CollectionDto[]>('/assets/mock/collections.json');
    }
    return this.collections$;
  }
}
