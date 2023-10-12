import { AdvertisementsRepository } from "@/repositories/advertisements-repository";
import { Banner } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetBannersUseCaseResponse {
  banners: Banner[];
}

export class GetBannersUseCase {
  constructor(private advertisementsRepository: AdvertisementsRepository) {}

  async execute(): Promise<GetBannersUseCaseResponse> {
    const banners = await this.advertisementsRepository.findManyBanners();

    if (!banners) {
      throw new ResourceNotFoundError();
    }

    return {
      banners,
    };
  }
}
