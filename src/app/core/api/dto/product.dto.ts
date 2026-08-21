/**
 * Raw JSON shapes returned by the commerce API wrapper. These mirror
 * GET /api/v1/:storeKey/products and /products/:handle today, but are kept
 * separate from the app's domain models (see core/models) so a future
 * backend response change only requires updating this file and the
 * matching mapper in core/mappers, not every component that renders a
 * product.
 */
export interface MoneyDto {
  amount: string;
  currencyCode: string;
}

export interface ImageDto {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface SelectedOptionDto {
  name: string;
  value: string;
}

export interface ProductOptionDto {
  name: string;
  values: string[];
}

export interface ProductVariantDto {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  sku?: string | null;
  price: MoneyDto;
  compareAtPrice?: MoneyDto | null;
  selectedOptions?: SelectedOptionDto[];
  image?: ImageDto | null;
}

export interface MetafieldDto {
  namespace: string;
  key: string;
  value: string;
  type: string;
}

export interface ProductDto {
  id: string;
  handle: string;
  title: string;
  description?: string | null;
  descriptionHtml?: string | null;
  availableForSale: boolean;
  tags?: string[];
  productType?: string | null;
  vendor?: string | null;
  images?: ImageDto[];
  variants?: ProductVariantDto[];
  options?: ProductOptionDto[];
  priceRange: {
    minVariantPrice: MoneyDto;
    maxVariantPrice: MoneyDto;
  };
  compareAtPriceRange?: {
    minVariantPrice: MoneyDto;
    maxVariantPrice: MoneyDto;
  } | null;
  metafields?: MetafieldDto[];
  collections?: string[];
}

export interface PageInfoDto {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor?: string | null;
  startCursor?: string | null;
}

export interface ProductListResponseDto {
  products: ProductDto[];
  pageInfo: PageInfoDto;
}
