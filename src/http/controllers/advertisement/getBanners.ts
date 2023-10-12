import { PrismaAdvertisementsRepository } from "@/repositories/prisma/prisma-advertisements-repository";
import { GetBannersUseCase } from "@/use-cases/advertisement/get-banners";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getBanners(request: FastifyRequest, reply: FastifyReply) {
  const advertisementsRepository = new PrismaAdvertisementsRepository();
  const getBanners = new GetBannersUseCase(advertisementsRepository);

  const banners = await getBanners.execute();
  console.log("test1");
  return reply.status(200).send(banners);
}
