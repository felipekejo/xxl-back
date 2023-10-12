import { GetProductCheckout, ProductCheckOut } from "@/@types/checkout";

export interface CheckOutRepository {
  create(lineItems: ProductCheckOut[]): Promise<string | null>;
  getById(id: string): Promise<GetProductCheckout | null>;
}
