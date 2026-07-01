export type Category = 'Watches' | 'Rings' | 'Bracelets' | 'Necklaces' | 'Sunglasses';

export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  basePrice: number;
  variants: ProductVariant[];
  featuredImage: string;
  tags?: string[];
}

export interface CartItem {
  variantId: string;
  productId: string;
  quantity: number;
}
