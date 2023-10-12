import { OrdersRepository } from "@/repositories/orders-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteOrderUseCaseRequest {
  orderNo: string;
}

/**
 * Handles the use case of deleting an order.
 */
export class DeleteOrderUseCase {
  /**
   * Initializes an instance of DeleteOrderUseCase.
   * @param ordersRepository - The repository to interact with orders data.
   */
  constructor(private ordersRepository: OrdersRepository) { }

  /**
   * Executes the use case for deleting an order.
   * @param request - The request containing the order number to delete.
   * @throws ResourceNotFoundError if the order with the given order number does not exist.
   */
  async execute({ orderNo }: DeleteOrderUseCaseRequest) {    
    const orderExists = await this.ordersRepository.findByOrderNo(orderNo);

    if (!orderExists) {
      throw new ResourceNotFoundError();
    }

    await this.ordersRepository.delete(orderNo);
  }
}
