import { PrismaServicesRepository } from "@/repositories/prisma/prisma-services-repository";
import { DeleteServiceUseCase } from "@/use-cases/service/delete-service";
import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Handles the deletion of a service.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<FastifyReply>} A promise that resolves with the deletion success message.
 */
export async function deleteService(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Create a new instance of the PrismaServicesRepository
  const servicesRepository = new PrismaServicesRepository();

  // Create a new instance of the DeleteServiceUseCase, passing in the services repository
  const deleteService = new DeleteServiceUseCase(servicesRepository);

  // Extract the serviceId from the request parameters
  const { serviceId } = request.params as {
    serviceId: string;
  };

  // Call the DeleteServiceUseCase to delete the service
  await deleteService.execute({ serviceId });

  // Return a success message
  return reply.status(200).send({ message: "Service deleted successfully" });
}
