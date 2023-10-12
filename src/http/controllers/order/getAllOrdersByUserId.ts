import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetAllOrdersByUserIdUseCase } from "@/use-cases/order/get-all-orders-by-user-id";
import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Handles the retrieval of all orders by a user ID.
 *
 * @param {FastifyRequest} request - The FastifyRequest object representing the incoming HTTP request.
 * @param {FastifyReply} reply - The FastifyReply object representing the outgoing HTTP response.
 * @returns {FastifyReply} A FastifyReply with appropriate status and data.
 */
export async function getAllOrdersByUserId(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) {
  // Extract the user ID from the URL parameter
  const userId = request.params.userId;

  // Initialize the orders repository and the get all orders by user ID use case
  const ordersRepository = new PrismaOrdersRepository();
  const usersRepository = new PrismaUsersRepository();
  const getAllOrdersByUserIdUseCase = new GetAllOrdersByUserIdUseCase(
    ordersRepository,
    usersRepository
  );

  try {
    // Execute the get all orders by user ID use case
    const orders = await getAllOrdersByUserIdUseCase.execute(userId);

    // Respond with the retrieved orders and 200 OK status
    return reply.status(200).send(orders);
  } catch (error) {
    // If an error occurs, respond with an error message and appropriate status
    return reply.status(500).send({ error: "Failed to retrieve orders." });
  }
}
