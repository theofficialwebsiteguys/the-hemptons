import { ImageDto, MoneyDto, ProductDto, ProductListResponseDto, ProductVariantDto } from '../api/dto/product.dto';
import { Money } from '../models/money.model';
import { ProductImage } from '../models/image.model';
import { Product, ProductListResult, ProductVariant } from '../models/product.model';
import { PaginationInfo } from '../models/pagination.model';

export function mapMoney(dto: MoneyDto | null | undefined): Money {
  return { amount: dto?.amount ?? '0', currencyCode: dto?.currencyCode ?? 'USD' };
}

export function mapImage(dto: ImageDto | null | undefined): ProductImage | null {
  if (!dto?.url) return null;
  return {
    url: dto.url,
    altText: dto.altText ?? null,
    width: dto.width ?? null,
    height: dto.height ?? null
  };
}

export function mapVariant(dto: ProductVariantDto): ProductVariant {
  return {
    id: dto.id,
    title: dto.title,
    availableForSale: dto.availableForSale,
    quantityAvailable: dto.quantityAvailable ?? null,
    sku: dto.sku ?? null,
    price: mapMoney(dto.price),
    compareAtPrice: dto.compareAtPrice ? mapMoney(dto.compareAtPrice) : null,
    selectedOptions: dto.selectedOptions ?? [],
    image: mapImage(dto.image)
  };
}

export function mapPageInfo(dto: { hasNextPage: boolean; hasPreviousPage: boolean; endCursor?: string | null; startCursor?: string | null } | undefined): PaginationInfo {
  return {
    hasNextPage: dto?.hasNextPage ?? false,
    hasPreviousPage: dto?.hasPreviousPage ?? false,
    endCursor: dto?.endCursor ?? null,
    startCursor: dto?.startCursor ?? null
  };
}

export function mapProduct(dto: ProductDto): Product {
  const images = (dto.images ?? []).map(mapImage).filter((img): img is ProductImage => !!img);

  return {
    id: dto.id,
    handle: dto.handle,
    title: dto.title,
    description: dto.description ?? '',
    descriptionHtml: dto.descriptionHtml ?? null,
    vendor: dto.vendor ?? null,
    productType: dto.productType ?? null,
    tags: dto.tags ?? [],
    featuredImage: images[0] ?? null,
    images,
    variants: (dto.variants ?? []).map(mapVariant),
    options: dto.options ?? [],
    priceRange: {
      minVariantPrice: mapMoney(dto.priceRange?.minVariantPrice),
      maxVariantPrice: mapMoney(dto.priceRange?.maxVariantPrice)
    },
    compareAtPriceRange: dto.compareAtPriceRange
      ? {
          minVariantPrice: mapMoney(dto.compareAtPriceRange.minVariantPrice),
          maxVariantPrice: mapMoney(dto.compareAtPriceRange.maxVariantPrice)
        }
      : null,
    availableForSale: dto.availableForSale,
    metafields: dto.metafields ?? [],
    collections: dto.collections ?? []
  };
}

export function mapProductListResponse(dto: ProductListResponseDto): ProductListResult {
  return {
    products: (dto.products ?? []).map(mapProduct),
    pageInfo: mapPageInfo(dto.pageInfo)
  };
}
