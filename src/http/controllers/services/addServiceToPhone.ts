import { PrismaServicesRepository } from "@/repositories/prisma/prisma-services-repository";
import { AddServiceToPhoneUseCase } from "@/use-cases/service/add-service-to-phone";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

/**
 * Handles the addition of a new service to a phone.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise} A promise that resolves with the response.
 */
export async function addServiceToPhone(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Define the schema for the request body using the Zod library
  const addServiceBodySchema = z.object({
    phoneId: z.string(),
    serviceName: z.string(),
    servicePrice: z.number(),
  });

  // Create a new instance of the PrismaServicesRepository for database operations
  const servicesRepository = new PrismaServicesRepository();

  // Create a new instance of the AddServiceToPhoneUseCase, passing in the repository
  const addService = new AddServiceToPhoneUseCase(servicesRepository);

  try {
    // Parse the request body to extract phoneId, serviceName, and servicePrice
    const { phoneId, serviceName, servicePrice } = addServiceBodySchema.parse(
      request.body
    );

    // Execute the AddServiceToPhoneUseCase to add the service to the phone
    const service = await addService.execute({
      phoneId,
      serviceData: {
        name: serviceName,
        price: servicePrice,
        Phone: { connect: { id: phoneId } },
      },
    });

    // Return a success response with the added service
    return reply
      .status(201)
      .send({ message: "Service added to phone successfully", service });
  } catch (error) {
    // Handle any errors that occurred during the process and return an error response
    return reply.status(500).send({ error: "Failed to add service to phone" });
  }
}
