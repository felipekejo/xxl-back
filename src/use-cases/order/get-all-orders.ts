import { OrdersRepository } from "@/repositories/orders-repository";
import { UsersRepository } from "@/repositories/users-repository";

type ItemLine = {
  id: string;
  order_id: string;
  quantity: number;
  product_id: string;
  product_name: string;
  unitaryPrice: number;
};

type Order = {
  orderNo: string;
  status: string;
  orderDate: Date;
  deliveryAddress: string;
  customer_id: string;
  total: number;
  lineItems: ItemLine[];
  customer: string;
  email: string;
};

export class GetAllOrdersUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute(): Promise<Order[]> {
    const orders = await this.ordersRepository.findAll();

    const allInfoOrders = await Promise.all(
      orders.map(async (order) => {
        const lineItems = await this.ordersRepository.findLineItemsByOrderNo(
          order.orderNo
        );

        // Fetch user data for each order separately
        const user = await this.usersRepository.findById(order.customer_id);

        return {
          ...order,
          lineItems: lineItems || [],
          customer: user?.first_name || "", // Use a default value if user is null
          email: user?.email || "", // Use a default value if user is null
        };
      })
    );

    return allInfoOrders;
  }
}
