import {
  PriceStripe,
  Product,
  ProductStripe,
  Products,
} from "@/@types/products";

type ProductStripeResponse = {
  id: string;
  priceId: string;
};

type PriceStripeResponse = {
  priceId: string;
};

export interface ProductsPaymentAPIRepository {
  // findAll retrieves all products
  findAll(): Promise<Products[]>;
  // findById retrieves a product by their ID
  findById(id: string): Promise<Product | null>;

  create(product: ProductStripe): Promise<ProductStripeResponse>;

  delete(productId: string): Promise<void>;

  update(product: Products): Promise<void>;

  createPrice(priceStripe: PriceStripe): Promise<PriceStripeResponse>;
}
