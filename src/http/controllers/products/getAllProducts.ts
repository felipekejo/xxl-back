import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { ProductsRepository } from "@/repositories/products-repository";
import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Fetches all products and their associated technical details.
 *
 * @param {FastifyRequest} request - The FastifyRequest object representing the incoming HTTP request.
 * @param {FastifyReply} reply - The FastifyReply object representing the outgoing HTTP response.
 * @returns {FastifyReply} A FastifyReply with appropriate status and a list of products.
 */
export async function getAllProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productsRepository =
    new PrismaProductsRepository() as ProductsRepository;

  try {
    // Fetch all products using the repository
    const products = await productsRepository.findAll();

    // Loop through products and fetch and attach technical details for each
    for (const product of products) {
      const technicalDetails =
        await productsRepository.getAllTechnicalDetailsByProdId(product.id);
      product.TechnicalDetail = technicalDetails;
    }

    return reply.status(200).send(products);
  } catch (error) {
    return reply.status(500).send({ error: "Failed to fetch products" });
  }
}
