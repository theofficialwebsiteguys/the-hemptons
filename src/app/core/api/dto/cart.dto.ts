import { ImageDto, MoneyDto, SelectedOptionDto } from './product.dto';

export interface CartLineMerchandiseDto {
  id: string;
  title: string;
  product: {
    handle: string;
    title: string;
  };
  image?: ImageDto | null;
  price: MoneyDto;
  selectedOptions?: SelectedOptionDto[];
}

export interface CartLineDto {
  id: string;
  quantity: number;
  merchandise: CartLineMerchandiseDto;
  cost: {
    totalAmount: MoneyDto;
  };
}

export interface CartDiscountCodeDto {
  code: string;
  applicable: boolean;
}

export interface CartDto {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLineDto[];
  cost: {
    subtotalAmount: MoneyDto;
    totalAmount: MoneyDto;
    totalTaxAmount?: MoneyDto | null;
  };
  discountCodes?: CartDiscountCodeDto[];
}
