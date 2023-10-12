
import { FastifyReply, FastifyRequest } from "fastify";
import { number, z } from "zod";
import { PrismaServicesRepository } from "@/repositories/prisma/prisma-services-repository";
import { UpdateServiceUseCase } from "@/use-cases/service/update-service";

/**
 * This function updates the details of a service based on the provided request body.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {FastifyReply} A Fastify reply with the appropriate status code.
 */
export async function updateService(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateServiceBodySchema = z.object({
    serviceId: z.string(),
    newPrice: z.union([z.string(), z.number()]).optional(),
    newServiceName: z.string().optional(),
  });

  // Parse the request body according to the defined schema
  const { serviceId, newServiceName, newPrice } = updateServiceBodySchema.parse(request.body);

  // Create an instance of the PrismaServicesRepository
  const prismaServicesRepository = new PrismaServicesRepository();

  // Create an instance of the UpdateServiceUseCase and pass in the repository
  const updateServiceUseCase = new UpdateServiceUseCase(prismaServicesRepository);

  try {
    // Check if newPrice is a valid number
    const parsedPrice = parseFloat(newPrice);

    if (isNaN(parsedPrice)) {
      return reply.status(400).send({ error: "Price must be a number." });
    }

    // Call the execute method of the UpdateServiceUseCase with the parsed request body
    await updateServiceUseCase.execute({
      serviceId,
      newPrice: parsedPrice,
      newServiceName,
    });

    // If the code reaches here, the service update was successful
    return reply.status(200).send({ message: "Service updated successfully" });
  } catch (error) {
    // Handle any errors that occurred during the process
    return reply.status(500).send({ error: "Failed to update service" });
  }
}
