import { PrismaRepairPhonesRepository } from "@/repositories/prisma/prisma-phones-repository";
import { DeleteRepairPhoneUseCase } from "@/use-cases/service/delete-phone";
import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Handles the deletion of a phone.
 *
 * @param {FastifyRequest} request - The FastifyRequest object representing the incoming HTTP request.
 * @param {FastifyReply} reply - The FastifyReply object representing the outgoing HTTP response.
 * @returns {FastifyReply} A FastifyReply with appropriate status and message.
 */
export async function deleteRepairPhone(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Create a new instance of the PrismaRepairPhonesRepository
  const repairPhonesRepository = new PrismaRepairPhonesRepository();

  // Create a new instance of the DeleteRepairPhoneUseCase, passing in the phones repository
  const deleteRepairPhoneUseCase = new DeleteRepairPhoneUseCase(repairPhonesRepository);

  // Explicitly type request.params to specify its structure
  const params: { phoneId: string } = request.params as any;

  // Extract the repairPhoneId from the request parameters
  const repairPhoneId = params.phoneId;

  try {
    // Call the DeleteRepairPhoneUseCase to delete the phone
    await deleteRepairPhoneUseCase.execute({ repairPhoneId });

    // Return a success message with a 200 status code
    return reply.status(200).send({ message: "Phone deleted successfully" });
  } catch (error) {
    // Handle errors and respond with an error message and a 500 status code
    return reply.status(500).send({ error: "Failed to delete phone" });
  }
}