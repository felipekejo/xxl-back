import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { StripeProductsRepository } from "@/repositories/stripe/stripe-products-repository";
import { CreateProductUseCase } from "@/use-cases/product/create-products";
import { CreateTechnicalDetailUseCase } from "@/use-cases/product/create-technicalDetails";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

/**
 * Handles the creation of a new product.
 * @param request - The FastifyRequest object representing the incoming HTTP request.
 * @param reply - The FastifyReply object representing the outgoing HTTP response.
 * @returns A FastifyReply with appropriate status and message.
 */
export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Define a schema for validating the request body
  const createProductBodySchema = z.object({
    name: z.string().min(1),
    price: z.number().min(0.01),
    stock: z.number().min(0),
    discount: z.boolean(),
    discountTotal: z.number().min(0).default(0),
    img_urls: z.array(z.string()),
    briefDescription: z.string().optional(),
    keyInfo: z.string().optional(),
    AboutItem: z.string().optional(),
    technicalDetails: z
      .array(
        z.object({
          detailName: z.string(),
          detailValue: z.string(),
        })
      )
      .optional(),
  });

  // Initialize the products repository and the create product use case
  const productsRepository = new PrismaProductsRepository();
  const stripeProductsRepository = new StripeProductsRepository();
  const createProductUseCase = new CreateProductUseCase(
    stripeProductsRepository,
    productsRepository
  );

  const createTechnicalDetail = new CreateTechnicalDetailUseCase(
    productsRepository
  );

  try {
    // Parse and validate the product data from the request body
    const {
      name,
      price,
      stock,
      discount,
      discountTotal,
      img_urls,
      briefDescription,
      keyInfo,
      AboutItem,
      technicalDetails,
    } = createProductBodySchema.parse(request.body);

    // Execute the create product use case with the validated product data
    const product = await createProductUseCase.execute({
      name,
      price,
      stock,
      discount,
      discountTotal,
      img_urls,
      briefDescription,
      keyInfo,
      AboutItem,
    });

    (technicalDetails || []).map(
      async (detail) =>
        await createTechnicalDetail.execute({
          productId: product.id,
          detailName: detail.detailName,
          detailValue: detail.detailValue,
        })
    );

    // Respond with a success message and 201 Created status
    return reply.status(201).send({ message: "Product created successfully" });
  } catch (error) {
    // If an error occurs, respond with an error message
    return reply.status(500).send({ error: "Failed to create product" });
  }
}
