import { ImageDto, PageInfoDto, ProductDto } from './product.dto';

export interface CollectionDto {
  id: string;
  handle: string;
  title: string;
  description?: string | null;
  image?: ImageDto | null;
}

export interface CollectionWithProductsResponseDto {
  collection: CollectionDto;
  products: ProductDto[];
  pageInfo?: PageInfoDto;
}
