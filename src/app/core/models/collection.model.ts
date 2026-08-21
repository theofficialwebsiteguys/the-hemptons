import { ProductImage } from './image.model';
import { Product } from './product.model';
import { PaginationInfo } from './pagination.model';

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string | null;
  image: ProductImage | null;
}

export interface CollectionWithProducts {
  collection: Collection;
  products: Product[];
  pageInfo?: PaginationInfo;
}
