import { RepairPhonesRepository } from "@/repositories/phones-repository";
import { Phone } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

// Define the request interface for the use case
interface GetRepairPhonesUseCaseRequest {
  page: number;
}

// Define the response interface for the use case
interface GetRepairPhonesUseCaseResponse {
  repairPhones: Phone[];
}

// Define the use case class
export class GetRepairPhonesUseCase {
  constructor(private repairPhonesRepository: RepairPhonesRepository) {}

  // Define the execute method for the use case
  async execute({
    page,
  }: GetRepairPhonesUseCaseRequest): Promise<GetRepairPhonesUseCaseResponse> {
    // Find the phones using the injected repository
    const repairPhones = await this.repairPhonesRepository.findMany(page);

    // If no phones are found, return empty array
    if (!repairPhones || repairPhones.length === 0) {
      // TODO: decide if return empty array or throw error.
      throw new ResourceNotFoundError();
      // throw new ResourceNotFoundError();
    }

    // Return the phones in a response object
    return {
      repairPhones,
    };
  }
}
