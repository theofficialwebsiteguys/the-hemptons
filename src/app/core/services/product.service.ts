import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ProductListResponseDto, ProductDto } from '../api/dto/product.dto';
import { StorefrontApiService } from '../api/storefront-api.service';
import { mapProduct, mapProductListResponse } from '../mappers/product.mapper';
import { MockDataService } from './mock-data.service';
import { Product, ProductListResult, ProductQueryParams } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly api = inject(StorefrontApiService);
  private readonly mockData = inject(MockDataService);

  getProducts(params: ProductQueryParams = {}): Observable<ProductListResult> {
    const source$ = environment.useMockData
      ? this.mockData.getProducts(params)
      : this.api.get<ProductListResponseDto>('/products', {
          search: params.search,
          collection: params.collection,
          limit: params.limit,
          cursor: params.cursor,
          availableOnly: params.availableOnly ? 'true' : undefined
        });

    return source$.pipe(map(mapProductListResponse));
  }

  getProductByHandle(handle: string): Observable<Product> {
    const source$ = environment.useMockData
      ? this.mockData.getProductByHandle(handle)
      : this.api.get<ProductDto>(`/products/${encodeURIComponent(handle)}`);

    return source$.pipe(map(mapProduct));
  }
}
