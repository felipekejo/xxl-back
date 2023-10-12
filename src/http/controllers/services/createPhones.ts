import { PrismaRepairPhonesRepository } from "@/repositories/prisma/prisma-phones-repository";
import { CreateRepairPhoneUseCase } from "@/use-cases/service/create-phone";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

/**
 * Handles the creation of repair phones and their associated services.
 *
 * @param {FastifyRequest} request - The FastifyRequest object representing the incoming HTTP request.
 * @param {FastifyReply} reply - The FastifyReply object representing the outgoing HTTP response.
 * @returns {FastifyReply} A FastifyReply with appropriate status and message.
 */
export async function createRepairPhones(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Defining the schema for the request body
  const createRepairPhoneBodySchema = z.object({
    repairPhoneName: z.string(),
  });

  // Create a new instance of the PrismaPhonesRepository
  const repairPhonesRepository = new PrismaRepairPhonesRepository();

  // Create a new instance of the CreateRepairPhoneUseCase, passing in the phones repository
  const createRepairPhone = new CreateRepairPhoneUseCase(repairPhonesRepository);

  // Get the phone name from the request body
  const { repairPhoneName } = createRepairPhoneBodySchema.parse(request.body);

  try {
    // Call the CreateRepairPhoneUseCase to create the repair phone with empty service names and prices
    await createRepairPhone.execute({
      repairPhoneName,
    });

    // Return a success response
    return reply
      .status(201)
      .send({ message: "Repair phone and services created successfully" });
  } catch (error) {
    // Handle any errors that occurred during the creation process
    return reply
      .status(500)
      .send({ error: "Failed to create repair phone and services" });
  }
}
