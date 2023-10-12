import { PrismaAdvertisementsRepository } from "@/repositories/prisma/prisma-advertisements-repository";
import { DeleteSecondAdUseCase } from "@/use-cases/advertisement/delete-second-ad";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteSecondAd(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteSecondAdSchema = z.object({
    secondAdId: z.string(),
  });

  const { secondAdId } = deleteSecondAdSchema.parse(request.params);

  const advertisementsRepository = new PrismaAdvertisementsRepository();
  const deleteSecondAd = new DeleteSecondAdUseCase(advertisementsRepository);

  await deleteSecondAd.execute({ secondAdId });

  return reply.status(200).send({ message: "Banner deleted successfully" });
}
