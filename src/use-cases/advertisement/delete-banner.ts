import { AdvertisementsRepository } from "@/repositories/advertisements-repository";

interface DeleteBannerUseCaseRequest {
  bannerId: string;
}
export class DeleteBannerUseCase {
  constructor(private advertisementsRepository: AdvertisementsRepository) {}

  async execute({ bannerId }: DeleteBannerUseCaseRequest): Promise<void> {
    await this.advertisementsRepository.deleteBanner(bannerId);
  }
}
