import { prisma } from "@/lib/prisma";
import { AdvertisementsRepository } from "../advertisements-repository";
import { Prisma } from "@prisma/client";

export class PrismaAdvertisementsRepository
  implements AdvertisementsRepository
{
  async createBanner(data: Prisma.BannerCreateInput) {
    await prisma.banner.create({
      data,
    });
  }

  async createSecondAd(data: Prisma.SecondAdCreateInput) {
    await prisma.secondAd.create({
      data,
    });
  }

  async findManyBanners() {
    const banners = await prisma.banner.findMany();

    return banners;
  }

  async findManySecondAd() {
    const secondAds = await prisma.secondAd.findMany();

    return secondAds;
  }

  async deleteBanner(id: string) {
    await prisma.banner.delete({
      where: {
        id,
      },
    });
  }

  async deleteSecondAd(id: string) {
    await prisma.secondAd.delete({
      where: {
        id,
      },
    });
  }
}
