import { PrismaContactMessagesRepository } from "@/repositories/prisma/prisma-contact-messages-repository";
import { GetMessagesUseCase } from "@/use-cases/contact/get-contact-messages";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listContactMessages(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listMessagesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = listMessagesQuerySchema.parse(request.query);
  // Create a new instance of the PrismaMessagesRepository
  const messagesRepository = new PrismaContactMessagesRepository();
  const messagesCount = await messagesRepository.count();

  // Create a new instance of the GetMessagesUseCase, passing in the messages repository
  const getMessages = new GetMessagesUseCase(messagesRepository);

  // Call the GetMessagesUseCase to get the messages
  const { messages } = await getMessages.execute({
    page,
  });

  // Return list of messages in the response body
  return reply.status(200).send({ messages, messagesCount });
}
