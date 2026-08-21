import { CollectionDto, CollectionWithProductsResponseDto } from '../api/dto/collection.dto';
import { Collection, CollectionWithProducts } from '../models/collection.model';
import { mapImage, mapPageInfo, mapProduct } from './product.mapper';

export function mapCollection(dto: CollectionDto): Collection {
  return {
    id: dto.id,
    handle: dto.handle,
    title: dto.title,
    description: dto.description ?? null,
    image: mapImage(dto.image)
  };
}

export function mapCollectionWithProducts(dto: CollectionWithProductsResponseDto): CollectionWithProducts {
  return {
    collection: mapCollection(dto.collection),
    products: (dto.products ?? []).map(mapProduct),
    pageInfo: dto.pageInfo ? mapPageInfo(dto.pageInfo) : undefined
  };
}
