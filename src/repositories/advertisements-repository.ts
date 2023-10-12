import { Banner, Prisma, SecondAd } from "@prisma/client";

export interface AdvertisementsRepository {
  findManyBanners(): Promise<Banner[]>;

  findManySecondAd(): Promise<SecondAd[]>;

  deleteBanner(id: string): Promise<void>;

  deleteSecondAd(id: string): Promise<void>;

  createBanner(data: Prisma.BannerCreateInput): Promise<void>;

  createSecondAd(data: Prisma.SecondAdCreateInput): Promise<void>;
}
