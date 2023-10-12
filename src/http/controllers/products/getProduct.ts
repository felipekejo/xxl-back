import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { ProductsRepository } from "@/repositories/products-repository";
import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Fetches product details and associated technical details.
 * 
 * @param {FastifyRequest} request - The FastifyRequest object representing the incoming HTTP request.
 * @param {FastifyReply} reply - The FastifyReply object representing the outgoing HTTP response.
 * @returns {FastifyReply} A FastifyReply with appropriate status and product details.
 */
export async function getProduct(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const productId = request.params.id;
  const productsRepository = new PrismaProductsRepository() as ProductsRepository;

  try {
    // Fetch product details using the repository
    const product = await productsRepository.findById(productId);

    if (!product) {
      return reply
        .status(404)
        .send({ error: "Product not found" });
    }

    // Fetch technical details using repository
    const technicalDetails = await productsRepository.getAllTechnicalDetailsByProdId(productId);

    // Attach technical details to the product
    product.TechnicalDetail = technicalDetails;

    return reply
      .status(200)
      .send(product);
  } catch (error) {
    return reply
      .status(500)
      .send({ error: "Failed to fetch product details" });
  }
}