import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CollectionDto, CollectionWithProductsResponseDto } from '../api/dto/collection.dto';
import { StorefrontApiService } from '../api/storefront-api.service';
import { mapCollection, mapCollectionWithProducts } from '../mappers/collection.mapper';
import { MockDataService } from './mock-data.service';
import { Collection, CollectionWithProducts } from '../models/collection.model';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private readonly api = inject(StorefrontApiService);
  private readonly mockData = inject(MockDataService);

  getCollections(): Observable<Collection[]> {
    const source$ = environment.useMockData
      ? this.mockData.getCollections()
      : this.api.get<CollectionDto[]>('/collections');

    return source$.pipe(map((collections) => collections.map(mapCollection)));
  }

  getCollectionByHandle(handle: string, limit = 100): Observable<CollectionWithProducts> {
    const source$ = environment.useMockData
      ? this.mockData.getCollectionByHandle(handle, limit)
      : this.api.get<CollectionWithProductsResponseDto>(`/collections/${encodeURIComponent(handle)}`, { limit });

    return source$.pipe(map(mapCollectionWithProducts));
  }
}
