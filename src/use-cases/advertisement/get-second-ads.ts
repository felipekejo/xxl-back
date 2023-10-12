import { AdvertisementsRepository } from "@/repositories/advertisements-repository";
import { SecondAd } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetSecondAdsUseCaseResponse {
  secondAds: SecondAd[];
}

export class GetSecondAdsUseCase {
  constructor(private advertisementsRepository: AdvertisementsRepository) {}

  async execute(): Promise<GetSecondAdsUseCaseResponse> {
    const secondAds = await this.advertisementsRepository.findManySecondAd();

    if (!secondAds) {
      throw new ResourceNotFoundError();
    }

    return {
      secondAds,
    };
  }
}
