import { Injectable } from '@angular/core';
import { Cart, CartLine } from '../models/cart.model';

interface MockVariantInfo {
  variantTitle: string;
  productHandle: string;
  productTitle: string;
  price: string;
  image: string | null;
}

/**
 * Small in-memory cart so the storefront is fully interactive in mock mode,
 * without a backend. Mirrors src/assets/mock/products.json — only the
 * fields CartLineItemComponent renders, kept separate from the product
 * fixture to avoid a sync-JSON-import build config just for this. Keep
 * these variant IDs in sync with products.json or addLine() silently
 * no-ops for unrecognized variants.
 */
const MOCK_VARIANTS: Record<string, MockVariantInfo> = {
  'gid://shopify/ProductVariant/64201026240881': {
    variantTitle: 'Default Title',
    productHandle: 'the-hemptons-mood-mat',
    productTitle: 'The Hemptons Mood Mat',
    price: '25.99',
    image: 'https://cdn.shopify.com/s/files/1/1026/4818/5201/files/IMG_7604.jpg?v=1784245105'
  },
  'gid://shopify/ProductVariant/64201026929009': {
    variantTitle: 'S',
    productHandle: 'the-hemptons-t-shirt',
    productTitle: 'The Hemptons T-Shirt',
    price: '20.99',
    image: null
  },
  'gid://shopify/ProductVariant/64215569006961': {
    variantTitle: 'M',
    productHandle: 'the-hemptons-t-shirt',
    productTitle: 'The Hemptons T-Shirt',
    price: '20.99',
    image: null
  },
  'gid://shopify/ProductVariant/64215569039729': {
    variantTitle: 'L',
    productHandle: 'the-hemptons-t-shirt',
    productTitle: 'The Hemptons T-Shirt',
    price: '20.99',
    image: null
  },
  'gid://shopify/ProductVariant/64215569072497': {
    variantTitle: 'XL',
    productHandle: 'the-hemptons-t-shirt',
    productTitle: 'The Hemptons T-Shirt',
    price: '20.99',
    image: null
  },
  'gid://shopify/ProductVariant/64215569105265': {
    variantTitle: '2XL',
    productHandle: 'the-hemptons-t-shirt',
    productTitle: 'The Hemptons T-Shirt',
    price: '20.99',
    image: null
  }
};

let cartCounter = 0;
let lineCounter = 0;

@Injectable({ providedIn: 'root' })
export class MockCartStore {
  private carts = new Map<string, Cart>();

  create(variantId: string, quantity: number): Cart {
    const id = `mock-cart-${++cartCounter}`;
    const cart: Cart = {
      id,
      checkoutUrl: `about:blank#mock-checkout-${id}`,
      totalQuantity: 0,
      lines: [],
      cost: {
        subtotalAmount: { amount: '0.00', currencyCode: 'USD' },
        totalAmount: { amount: '0.00', currencyCode: 'USD' },
        totalTaxAmount: null
      },
      discountCodes: []
    };
    this.carts.set(id, cart);
    return this.addLine(id, variantId, quantity)!;
  }

  get(cartId: string): Cart | null {
    return this.carts.get(cartId) ?? null;
  }

  addLine(cartId: string, variantId: string, quantity: number): Cart | null {
    const cart = this.carts.get(cartId);
    if (!cart) return null;

    const info = MOCK_VARIANTS[variantId];
    if (!info) return cart;

    const existing = cart.lines.find((l) => l.merchandise.id === variantId);
    if (existing) {
      existing.quantity += quantity;
      existing.cost.totalAmount = this.multiplyMoney(info.price, existing.quantity);
    } else {
      const line: CartLine = {
        id: `mock-line-${++lineCounter}`,
        quantity,
        merchandise: {
          id: variantId,
          title: info.variantTitle,
          product: { handle: info.productHandle, title: info.productTitle },
          image: info.image ? { url: info.image, altText: info.productTitle, width: 1200, height: 1500 } : null,
          price: { amount: info.price, currencyCode: 'USD' },
          selectedOptions: []
        },
        cost: { totalAmount: this.multiplyMoney(info.price, quantity) }
      };
      cart.lines.push(line);
    }

    return this.recalculate(cart);
  }

  updateLine(cartId: string, lineId: string, quantity: number): Cart | null {
    const cart = this.carts.get(cartId);
    if (!cart) return null;

    if (quantity <= 0) {
      cart.lines = cart.lines.filter((l) => l.id !== lineId);
    } else {
      const line = cart.lines.find((l) => l.id === lineId);
      if (line) {
        line.quantity = quantity;
        line.cost.totalAmount = this.multiplyMoney(line.merchandise.price.amount, quantity);
      }
    }

    return this.recalculate(cart);
  }

  removeLine(cartId: string, lineId: string): Cart | null {
    const cart = this.carts.get(cartId);
    if (!cart) return null;
    cart.lines = cart.lines.filter((l) => l.id !== lineId);
    return this.recalculate(cart);
  }

  private multiplyMoney(amount: string, quantity: number) {
    return { amount: (Number(amount) * quantity).toFixed(2), currencyCode: 'USD' };
  }

  private recalculate(cart: Cart): Cart {
    const totalQuantity = cart.lines.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = cart.lines.reduce((sum, l) => sum + Number(l.cost.totalAmount.amount), 0);

    cart.totalQuantity = totalQuantity;
    cart.cost.subtotalAmount = { amount: subtotal.toFixed(2), currencyCode: 'USD' };
    cart.cost.totalAmount = { amount: subtotal.toFixed(2), currencyCode: 'USD' };

    return { ...cart, lines: [...cart.lines] };
  }
}
