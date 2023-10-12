import { PrismaRepairPhonesRepository } from "@/repositories/prisma/prisma-phones-repository";
import { GetRepairPhonesUseCase as GetRepairPhonesUseCase } from "@/use-cases/service/get-phones";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listRepairPhones(request: FastifyRequest, reply: FastifyReply) {
  const listRepairPhonesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = listRepairPhonesQuerySchema.parse(request.query);

  // Create a new instance of the PrismaPhonesRepository
  const repairPhonesRepository = new PrismaRepairPhonesRepository();

  // Create a new instance of the GetPhonesUseCase, passing in the phones repository
  const getRepairPhones = new GetRepairPhonesUseCase(repairPhonesRepository);

  // Call the GetPhonesUseCase to get the list of phones
  const { repairPhones } = await getRepairPhones.execute({
    page,
  });

  // Return the list of phones in the response body
  return reply.status(200).send({ repairPhones });
}
