import { Money } from './money.model';
import { ProductImage } from './image.model';
import { PaginationInfo } from './pagination.model';

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  sku: string | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
  image: ProductImage | null;
}

export interface ProductMetafield {
  namespace: string;
  key: string;
  value: string;
  type: string;
}

export interface ProductPriceRange {
  minVariantPrice: Money;
  maxVariantPrice: Money;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string | null;
  vendor: string | null;
  productType: string | null;
  tags: string[];

  featuredImage: ProductImage | null;
  images: ProductImage[];

  variants: ProductVariant[];
  options: ProductOption[];

  priceRange: ProductPriceRange;
  compareAtPriceRange: ProductPriceRange | null;

  availableForSale: boolean;
  metafields: ProductMetafield[];
  collections: string[];
}

export interface ProductQueryParams {
  search?: string;
  collection?: string;
  limit?: number;
  cursor?: string;
  availableOnly?: boolean;
}

export interface ProductListResult {
  products: Product[];
  pageInfo: PaginationInfo;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'alphabetical';
