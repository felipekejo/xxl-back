import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaContactMessagesRepository } from "@/repositories/prisma/prisma-contact-messages-repository";
import { CreateMessageUseCase } from "@/use-cases/contact/create-contact-message";

/**
 * Handler function for creating a message.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<FastifyReply>} The Fastify reply with the response.
 */
export async function createContactMessage(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    // Define the schema for the request body
    const createMessageBodySchema = z.object({
        userId: z.string().nullable(),
        name: z.string(),
        email: z.string().email(),
        message: z.string(),
    });

    // Create a new instance of the PrismaMessagesRepository
    const messagesRepository = new PrismaContactMessagesRepository();

    // Create a new instance of the CreateMessageUseCase, passing in the messages repository
    const createMessage = new CreateMessageUseCase(messagesRepository);

    try {
        // Parse the request body using the schema
        const { userId, name, email, message } = createMessageBodySchema.parse(request.body);

        // Prepare the message data
        const messageData: { name: string; email: string; message: string; user?: object } = { name, email, message };

        if (userId) {
            messageData.user = {
                connect: {
                    id: userId,
                },
            };
        }

        // Call the CreateMessageUseCase to create the message
        await createMessage.execute({ userId, messageData });

        // Return a success response
        return reply.status(201).send({ message: "Message created successfully" });
    } catch (error) {
        // Handle any errors that occurred during the creation process
        return reply.status(500).send({ error: "Failed to create message" });
    }
}
