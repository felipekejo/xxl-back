import { PrismaAdvertisementsRepository } from "@/repositories/prisma/prisma-advertisements-repository";
import { GetSecondAdsUseCase } from "@/use-cases/advertisement/get-second-ads";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getSecondAds(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const advertisementsRepository = new PrismaAdvertisementsRepository();
  const getSecondAds = new GetSecondAdsUseCase(advertisementsRepository);

  const secondAds = await getSecondAds.execute();

  return reply.status(200).send(secondAds);
}
