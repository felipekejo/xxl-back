import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { UpdateOrderStatusUseCase } from "@/use-cases/order/update-order-status";
import { FastifyRequest, FastifyReply } from "fastify";

export async function updateOrderStatus(
    request: FastifyRequest<{ Params: { orderNo: string } }>,
    reply: FastifyReply
) {
    try {
        const { orderNo } = request.params; // Get the order number from the URL params.
        const { status } = request.body as { status: "Received" | "Sent" | "Delivered" }; // Get the new status from the request body.

        const ordersRepository = new PrismaOrdersRepository();

        const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(ordersRepository);

        // Execute the use case to update the order status.
        const updatedOrder = await updateOrderStatusUseCase.execute({ orderNo, status });

        // Respond with the updated order.
        reply.send(updatedOrder);
    } catch (error) {
        // Handle any errors and send an appropriate response.
        reply.status(500).send("Internal Server Error");
    }
}