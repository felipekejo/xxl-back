import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { DeleteOrderUseCase } from "@/use-cases/order/delete-order";
import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Handles the deletion of an order.
 * 
 * @param {FastifyRequest} request - The FastifyRequest object representing the incoming HTTP request.
 * @param {FastifyReply} reply - The FastifyReply object representing the outgoing HTTP response.
 * @returns {FastifyReply} A FastifyReply with appropriate status and message.
 */
export async function deleteOrder(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  // Extract the order number from the URL parameter
  const orderNo = request.params.id;

  // Initialize the orders repository and the delete order use case
  const ordersRepository = new PrismaOrdersRepository();
  const deleteOrderUseCase = new DeleteOrderUseCase(ordersRepository);

  try {
    // Execute the delete order use case
    await deleteOrderUseCase.execute({ orderNo });

    // Respond with a success message and 204 No Content status
    return reply
      .status(204)
      .send();
  } catch (error) {
    // If an error occurs, respond with an error message and appropriate status
    return reply
      .status(500)
      .send({ error: "Failed to delete order" });
  }
}
