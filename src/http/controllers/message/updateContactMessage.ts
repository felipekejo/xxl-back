import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaContactMessagesRepository } from "@/repositories/prisma/prisma-contact-messages-repository";
import { UpdateContactMessageUseCase } from "@/use-cases/contact/update-contact-message";

/**
 * Handler function for updating a contact message.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<FastifyReply>} The Fastify reply with the response.
 */
export async function updateContactMessage(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    /**
     * Shape of the request body for updating a contact message.
     *
     * @typedef {Object} UpdateContactMessageRequestBody
     * @property {string} messageId - The ID of the contact message to update.
     * @property {string} [newMessageContent] - The new content of the contact message. Optional.
     * @property {boolean} [replied] - The new value of the replied flag. Optional.
     */

    // Define the expected shape of the request body using the zod library
    const updateContactMessageBodySchema = z.object({
        messageId: z.string(),
        newMessageContent: z.string().optional(),
        replied: z.boolean().optional(),
    });

    // Parse the request body according to the defined schema
    const { messageId, newMessageContent, replied } = updateContactMessageBodySchema.parse(request.body);

    try {
        // Create an instance of the PrismaContactMessagesRepository
        const prismaContactMessagesRepository = new PrismaContactMessagesRepository();

        // Create an instance of the UpdateContactMessageUseCase and pass in the repository
        const updateContactMessageUseCase = new UpdateContactMessageUseCase(prismaContactMessagesRepository);

        // Call the execute method of the UpdateContactMessageUseCase with the parsed request body
        await updateContactMessageUseCase.execute({ messageId, newMessageContent, replied });

        // Return a success response with a 200 status code
        return reply.status(200).send({ success: true, message: "Contact message updated successfully" });
    } catch (error) {
        // Handle the error and return an appropriate response
        return reply.status(500).send({ error: "Failed to update contact message" });
    }
}
