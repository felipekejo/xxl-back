import { OrdersRepository } from "@/repositories/orders-repository";
import { Order, Prisma } from "@prisma/client";

export interface CartItem {
  id: string;
  price: number;
  quantity: number;
  name: string;
  imageUrl: string;
  priceId: string;
}

interface CreateOrderUseCaseRequest {
  /** The delivery address for the order. */
  deliveryAddress: string;
  /** The ID of the customer placing the order. */
  customer_id: string;
  /** An array of cart items containing product information. */
  cart: CartItem[];
  sessionId: string;
}

/**
 * Represents a use case for creating an order.
 */
export class CreateOrderUseCase {
  /**
   * Creates an instance of the CreateOrderUseCase.
   *
   * @param {OrdersRepository} ordersRepository - The repository for managing orders.
   */
  constructor(private ordersRepository: OrdersRepository) {}

  /**
   * Executes the create order use case.
   *
   * @param {CreateOrderUseCaseRequest} request - The request object containing order details.
   * @returns {Promise<Prisma.Order>} A promise that resolves with the created order.
   */
  async execute({
    deliveryAddress,
    customer_id,
    cart,
    sessionId,
  }: CreateOrderUseCaseRequest): Promise<Order> {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    // TODO: GUSTAVO - Discounts are now just a string field in the product model
    // Expect the frontend to be able to handle discounts there, as the product will have all attributes, including the full price and discount price (in case discount is true)

    const orderCreated = await this.ordersRepository.getOrderBySessionId(
      sessionId
    );

    if (orderCreated) {
      throw new Error("Order already exists");
    }

    const orderCreateInput: Prisma.OrderCreateInput = {
      sessionId,
      deliveryAddress,
      customer: { connect: { id: customer_id } },
      total,
      itemLines: {
        create: cart.map((item) => ({
          quantity: item.quantity,
          product: {
            connect: { id: item.id },
          },
          product_name: item.name,
          unitaryPrice: item.price,
        })),
      },
    };

    // Create the order using the injected repository and return the created order

    const createdOrder = await this.ordersRepository.create(orderCreateInput);
    return createdOrder;
  }
}
