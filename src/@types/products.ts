export interface Products {
  id: string;
  name: string;
  imageUrl: string[];
  price: number;
  priceId: string;
}

export interface ProductStripe {
  name: string;
  imageUrl: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string[];

  price: number;
  priceId: string;
}

export interface LineItems {
  price: number;
  quantity: number;
}

export interface PriceStripe {
  price: number;
  productId: string;
}
