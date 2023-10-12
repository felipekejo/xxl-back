import { PrismaAdvertisementsRepository } from "@/repositories/prisma/prisma-advertisements-repository";
import { DeleteBannerUseCase } from "@/use-cases/advertisement/delete-banner";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteBanner(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteBannerSchema = z.object({
    bannerId: z.string(),
  });

  const { bannerId } = deleteBannerSchema.parse(request.params);

  const advertisementsRepository = new PrismaAdvertisementsRepository();
  const deleteBanner = new DeleteBannerUseCase(advertisementsRepository);

  await deleteBanner.execute({ bannerId });

  return reply.status(200).send({ message: "Banner deleted successfully" });
}
