import { Product, SortOption } from '../models/product.model';

/**
 * Client-side sort applied to whatever page of products the API returned.
 * The backend wrapper has no `sort` query param today, so this never
 * invents server behavior — "Newest" is a no-op until the API/GraphQL
 * query exposes a createdAt-like field to sort on.
 */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => Number(a.priceRange.minVariantPrice.amount) - Number(b.priceRange.minVariantPrice.amount));
    case 'price-desc':
      return sorted.sort((a, b) => Number(b.priceRange.minVariantPrice.amount) - Number(a.priceRange.minVariantPrice.amount));
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
    case 'featured':
    default:
      return sorted;
  }
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetical', label: 'Alphabetical' }
];
