import { AdvertisementsRepository } from "@/repositories/advertisements-repository";

export class UploadSecondAdsUseCase {
  constructor(private advertisementsRepository: AdvertisementsRepository) {}

  async execute(secondAd: string) {
    await this.advertisementsRepository.createSecondAd({
      img_url: secondAd,
    });
  }
}
