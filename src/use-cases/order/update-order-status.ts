import { FastifyRequest, FastifyReply } from "fastify";
import { OrdersRepository } from "@/repositories/orders-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateOrderStatusUseCaseRequest {
    orderNo: string;
    status: "Received" | "Sent" | "Delivered";
}

export class UpdateOrderStatusUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({ orderNo, status }: UpdateOrderStatusUseCaseRequest) {
        // Check if the order exists
        const orderExists = await this.ordersRepository.findByOrderNo(orderNo);

        if (!orderExists) {
            throw new ResourceNotFoundError();
        }

        // Update the status of the order
        const updatedOrder = await this.ordersRepository.updateOrderStatus(orderNo, status);

        return updatedOrder;
    }
}
