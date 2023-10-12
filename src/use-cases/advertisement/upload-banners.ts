import { AdvertisementsRepository } from "@/repositories/advertisements-repository";

export class UploadBannersUseCase {
  constructor(private advertisementsRepository: AdvertisementsRepository) {}

  async execute(banner: string) {
    await this.advertisementsRepository.createBanner({
      img_url: banner,
    });
  }
}
