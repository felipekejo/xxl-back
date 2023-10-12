import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { UpdateProductUseCase } from "@/use-cases/product/update-product";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

/**
 * Handles the update of a product.
 *
 * @param {FastifyRequest<{ Params: { id: string } }>} request - The FastifyRequest object representing the incoming HTTP request.
 * @param {FastifyReply} reply - The FastifyReply object representing the outgoing HTTP response.
 * @returns {FastifyReply} A FastifyReply with appropriate status and message.
 */
export async function updateProduct(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  // Define a schema for validating the request body
  const updateProductBodySchema = z.object({
    name: z.string().min(1).optional(),
    price: z.number().min(0.01).optional(),
    stock: z.number().min(0).optional(),
    discount: z.boolean().optional(),
    discountTotal: z.number().min(0).default(0).optional(),
    img_urls: z.array(z.string()).optional(),
    briefDescription: z.array(z.string()).optional(),
    keyInfo: z.array(z.string()).optional(),
    AboutItem: z.array(z.string()).optional(),
    technicalDetails: z
      .array(
        z.object({
          detailName: z.string(),
          detailValue: z.string(),
        })
      )
      .optional(),
  });

  // Initialize the products repository and the update product use case
  const productsRepository = new PrismaProductsRepository();
  const updateProductUseCase = new UpdateProductUseCase(productsRepository);

  try {
    // Parse and validate the product data from the request body
    const productData = updateProductBodySchema.parse(request.body);
    const productId = request.params.id;

    // Execute the update product use case with the validated product data and ID
    await updateProductUseCase.execute({
      productId,
      productData,
    });

    // Respond with a success message and 200 OK status
    return reply.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    // If an error occurs, respond with an error message and appropriate status
    return reply.status(500).send({ error: "Failed to update product" });
  }
}
