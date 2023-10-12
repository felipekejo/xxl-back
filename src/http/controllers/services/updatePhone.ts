import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaRepairPhonesRepository } from "@/repositories/prisma/prisma-phones-repository";
import { UpdateRepairPhoneUseCase as UpdateRepairPhoneUseCase } from "@/use-cases/service/update-phone";

/**
 * Handles the update of phone details.
 *
 * @param {FastifyRequest} request - The FastifyRequest object representing the incoming HTTP request.
 * @param {FastifyReply} reply - The FastifyReply object representing the outgoing HTTP response.
 * @throws {Error} If an error occurs during the update process.
 */
export async function updateRepairPhone(request: FastifyRequest, reply: FastifyReply) {
    // Define the expected shape of the request body using the zod library
    const updateRepairPhoneBodySchema = z.object({
        phoneId: z.string(),
        newPhoneName: z.string().optional(),
    });

    // Parse the request body according to the defined schema
    const { phoneId, newPhoneName } = updateRepairPhoneBodySchema.parse(request.body);

    try {
        // Create an instance of the PrismaPhonesRepository
        const prismaRepairPhoneRepository = new PrismaRepairPhonesRepository();

        // Create an instance of the UpdatePhoneUseCase and pass in the repository
        const updateRepairPhoneUseCase = new UpdateRepairPhoneUseCase(prismaRepairPhoneRepository);

        // Call the execute method of the UpdatePhoneUseCase with the parsed request body
        await updateRepairPhoneUseCase.execute({ phoneId, newPhoneName });
    } catch (error) {
        // Throw the error to be handled elsewhere
        throw error;
    }

    // If the phone update was successful, return a 200 status code
    return reply.status(200).send();
}