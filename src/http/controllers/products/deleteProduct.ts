import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { StripeProductsRepository } from "@/repositories/stripe/stripe-products-repository";
import { DeleteProductsUseCase } from "@/use-cases/product/delete-product";
import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Handles the deletion of a product.
 *
 * @param {FastifyRequest} request - The FastifyRequest object representing the incoming HTTP request.
 * @param {FastifyReply} reply - The FastifyReply object representing the outgoing HTTP response.
 * @returns {FastifyReply} A FastifyReply with appropriate status and message.
 */
export async function deleteProduct(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  // Extract the product ID from the URL parameter
  const productId = request.params.id;
  console.log(productId);

  // Initialize the products repository and the delete product use case
  const productsRepository = new PrismaProductsRepository();
  const stripeProductsRepository = new StripeProductsRepository();

  const deleteProductUseCase = new DeleteProductsUseCase(
    productsRepository,
    stripeProductsRepository
  );

  try {
    // Execute the delete product use case
    await deleteProductUseCase.execute({ productId });

    // Respond with a success message and 204 No Content status
    return reply.status(204).send();
  } catch (error) {
    // If an error occurs, respond with an error message and appropriate status
    return reply.status(500).send({ error: "Failed to delete product" });
  }
}
