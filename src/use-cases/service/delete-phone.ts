import { RepairPhonesRepository } from "@/repositories/phones-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

/**
 * Represents the request interface for the DeleteRepairPhoneUseCase.
 */
interface DeleteRepairPhoneUseCaseRequest {
    /**
     * The ID of the repair phone to be deleted.
     */
    repairPhoneId: string;
}

/**
 * Represents the use case for deleting a repair phone.
 */
export class DeleteRepairPhoneUseCase {
    /**
     * Creates an instance of DeleteRepairPhoneUseCase.
     *
     * @param {RepairPhonesRepository} repairPhonesRepository - The repository for repair phones.
     */
    constructor(private repairPhonesRepository: RepairPhonesRepository) { }

    /**
     * Executes the use case to delete a repair phone.
     *
     * @param {DeleteRepairPhoneUseCaseRequest} params - The parameters for the use case.
     * @throws {ResourceNotFoundError} If the repair phone is not found.
     */
    async execute({ repairPhoneId }: DeleteRepairPhoneUseCaseRequest) {
        // Check if the phone with the given phoneId already exists in the database.
        // If it is null, it means the phone doesn't exist.
        const repairPhoneExists = await this.repairPhonesRepository.findById(repairPhoneId);

        if (!repairPhoneExists) {
            // Throw a custom error if the phone is not found.
            throw new ResourceNotFoundError();
        }

        // Delete the phone using the injected repository.
        await this.repairPhonesRepository.delete(repairPhoneId);
    }
}
