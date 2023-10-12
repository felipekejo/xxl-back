import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { FindByOrderNoUseCase } from "@/use-cases/order/get-order-by-order-no";
import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Handles the retrieval of an order by order number.
 * 
 * @param {FastifyRequest} request - The FastifyRequest object representing the incoming HTTP request.
 * @param {FastifyReply} reply - The FastifyReply object representing the outgoing HTTP response.
 * @returns {FastifyReply} A FastifyReply with appropriate status and data.
 */
export async function getOrderByOrderNo(
  request: FastifyRequest<{ Params: { orderNo: string } }>,
  reply: FastifyReply
) {
  // Extract the order number from the URL parameter
  const orderNo = request.params.orderNo;

  // Initialize the orders repository and the get order by order number use case
  const ordersRepository = new PrismaOrdersRepository();
  const findByOrderNoUseCase = new FindByOrderNoUseCase(ordersRepository);

  try {
    // Execute the find by order number use case
    const order = await findByOrderNoUseCase.execute(orderNo);

    // Respond with the retrieved order and 200 OK status
    return reply
      .status(200)
      .send(order);
  } catch (error) {
    // If an error occurs, respond with an error message and appropriate status
    return reply
      .status(500)
      .send({ error: "Failed to retrieve the order." });
  }
}