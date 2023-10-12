import { AdvertisementsRepository } from "@/repositories/advertisements-repository";

interface DeleteSecondAdUseCaseRequest {
  secondAdId: string;
}
export class DeleteSecondAdUseCase {
  constructor(private advertisementsRepository: AdvertisementsRepository) {}

  async execute({ secondAdId }: DeleteSecondAdUseCaseRequest): Promise<void> {
    await this.advertisementsRepository.deleteSecondAd(secondAdId);
  }
}
