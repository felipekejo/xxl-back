export interface CheckOutSessionURL {
  checkOutSession: string;
}

export interface ProductCheckOut {
  price: string;
  quantity: number;
}

export interface GetProductCheckout {
  total: number;
  customerId: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    country: string;
    postal_code: string;
  };
  checkoutProducts: {
    id: string;
    quantity: number;
    price: number;
    productName: string;
    image: string;
  }[];
}
