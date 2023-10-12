import { OrdersRepository } from "@/repositories/orders-repository";
import { Order } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class FindByOrderNoUseCase {
    constructor(private ordersRepository: OrdersRepository) {}
  
    async execute(orderNo: string): Promise<Order | null> {
      const order = await this.ordersRepository.findByOrderNo(orderNo);
  
      if (!order) {
        throw new ResourceNotFoundError();
      }
  
      return order;
    }
  }
  