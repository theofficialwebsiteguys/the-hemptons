import { CartDto, CartLineDto } from '../api/dto/cart.dto';
import { Cart, CartLine } from '../models/cart.model';
import { mapImage, mapMoney } from './product.mapper';

export function mapCartLine(dto: CartLineDto): CartLine {
  return {
    id: dto.id,
    quantity: dto.quantity,
    merchandise: {
      id: dto.merchandise.id,
      title: dto.merchandise.title,
      product: {
        handle: dto.merchandise.product.handle,
        title: dto.merchandise.product.title
      },
      image: mapImage(dto.merchandise.image),
      price: mapMoney(dto.merchandise.price),
      selectedOptions: dto.merchandise.selectedOptions ?? []
    },
    cost: {
      totalAmount: mapMoney(dto.cost.totalAmount)
    }
  };
}

export function mapCart(dto: CartDto): Cart {
  return {
    id: dto.id,
    checkoutUrl: dto.checkoutUrl,
    totalQuantity: dto.totalQuantity,
    lines: (dto.lines ?? []).map(mapCartLine),
    cost: {
      subtotalAmount: mapMoney(dto.cost.subtotalAmount),
      totalAmount: mapMoney(dto.cost.totalAmount),
      totalTaxAmount: dto.cost.totalTaxAmount ? mapMoney(dto.cost.totalTaxAmount) : null
    },
    discountCodes: dto.discountCodes ?? []
  };
}
