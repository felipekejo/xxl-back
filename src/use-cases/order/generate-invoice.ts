import { OrdersRepository } from "@/repositories/orders-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GenerateInvoiceUseCaseRequest {
  orderNo: string;
}

export class GenerateInvoiceUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private ordersRepository: OrdersRepository
  ) {}

  async execute({ orderNo }: GenerateInvoiceUseCaseRequest) {
    const order = await this.ordersRepository.findByOrderNo(orderNo);
    if (!order) {
      throw new ResourceNotFoundError();
    }
    const user = await this.usersRepository.findById(order.customer_id);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    const itemLines = await this.ordersRepository.findLineItemsByOrderNo(
      orderNo
    );

    const invoiceDetails = {
      customerName: user.first_name,
      customerEmail: user.email,
      status: order.status,
      orderNo,
      orderDate: order.orderDate,
      deliveryAddress: order.deliveryAddress,
      total: order.total,
      itemLines,
    };

    return invoiceDetails;
  }
}
