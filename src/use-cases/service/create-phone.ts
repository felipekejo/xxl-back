import { RepairPhonesRepository } from "@/repositories/phones-repository";
import { PhoneAlreadyExistsError as RepairPhoneAlreadyExistsError } from "../errors/phone-already-exists-error";

/**
 * Represents the request interface for the use case to create a repair phone.
 */
interface CreateRepairPhoneUseCaseRequest {
  repairPhoneName: string;
}

/**
 * Represents the use case class for creating a repair phone.
 */
export class CreateRepairPhoneUseCase {
  /**
   * Creates an instance of CreateRepairPhoneUseCase.
   *
   * @param {RepairPhonesRepository} repairPhonesRepository - The repository for managing repair phones.
   */
  constructor(private repairPhonesRepository: RepairPhonesRepository) { }

  /**
   * Executes the use case to create a repair phone with the given name.
   *
   * @param {CreateRepairPhoneUseCaseRequest} request - The request object containing the repair phone name.
   * @throws {RepairPhoneAlreadyExistsError} if a repair phone with the same name already exists.
   */
  async execute({ repairPhoneName }: CreateRepairPhoneUseCaseRequest) {
    // Check if the repair phone with the same name already exists in the database
    const alreadyCreated = await this.repairPhonesRepository.findByName(repairPhoneName);

    if (alreadyCreated) {
      // Throw a custom error indicating that the repair phone already exists
      throw new RepairPhoneAlreadyExistsError();
    }

    // Create the repair phone using the injected repository with empty service names and prices arrays
    await this.repairPhonesRepository.create({
      name: repairPhoneName,
      services: {
        create: [],
      },
    });
  }
}
