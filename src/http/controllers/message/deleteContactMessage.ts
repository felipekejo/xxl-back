import { PrismaContactMessagesRepository } from "@/repositories/prisma/prisma-contact-messages-repository";
import { DeleteMessageUseCase } from "@/use-cases/contact/delete-contact-message";
import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Deletes a message.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<FastifyReply>} The response with a success message.
 */
export async function deleteContactMessage(request: FastifyRequest, reply: FastifyReply) {
    // Create a new instance of the PrismaMessagesRepository
    const messagesRepository = new PrismaContactMessagesRepository();

    // Create a new instance of the DeleteMessageUseCase, passing in the messages repository
    const deleteMessage = new DeleteMessageUseCase(messagesRepository);


    console.log(request.params)
    const { messageId } = request.params as { messageId: string };


    // Call the DeleteMessageUseCase to delete the message
    await deleteMessage.execute({ messageId });

    // Return a success message
    return reply.status(200).send({ message: "Message deleted successfully" });
}
