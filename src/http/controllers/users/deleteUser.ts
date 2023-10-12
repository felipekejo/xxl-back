import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { DeleteUserUseCase } from "@/use-cases/user/delete-profile";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserSchema = z.object({
    userId: z.string(),
  });

  const { userId } = deleteUserSchema.parse(request.params);

  // Create a new instance of the PrismaUsersRepository
  const usersRepository = new PrismaUsersRepository();

  // Create a new instance of the DeleteUserUseCase, passing in the users repository
  const deleteUser = new DeleteUserUseCase(usersRepository);

  // Call the DeleteUserUseCase to delete the user
  await deleteUser.execute({ userId });

  // Return just a message
  return reply.status(200).send({ message: "User deleted successfully" });
}
