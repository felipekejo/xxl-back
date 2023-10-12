import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { UpdateProductImgUrlsUseCase } from "@/use-cases/product/update-urls";
import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";

export async function updateProductImgUrls(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    // Define a schema for validating the request body
    const updateImgUrlsBodySchema = z.object({
        img_urls: z.array(z.string()).min(1), // Validate img_urls array
    });

    // Initialize the products repository and the update product img_urls use case
    const productsRepository = new PrismaProductsRepository();
    const updateProductImgUrlsUseCase = new UpdateProductImgUrlsUseCase(
        productsRepository
    );

    try {
        // Parse and validate the img_urls data from the request body
        const imgUrlsData = updateImgUrlsBodySchema.parse(request.body);
        const productId = request.params.id;

        // Execute the update product img_urls use case with the validated img_urls data and ID
        const updatedProduct = await updateProductImgUrlsUseCase.execute({
            productId,
            imgUrls: imgUrlsData.img_urls,
        });

        // Respond with the updated product
        reply.send(updatedProduct);
    } catch (error) {
        // Handle any errors and send an appropriate response
        reply.status(500).send("Internal Server Error");
    }
}
