import { RepairPhonesRepository } from "@/repositories/phones-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

// Define the request interface for the use case
interface UpdateRepairPhoneUseCaseRequest {
    phoneId: string;
    newPhoneName?: string;
}

/**
 * The Use Case for updating phone details.
 */
export class UpdateRepairPhoneUseCase {
    /**
     * Creates an instance of UpdateRepairPhoneUseCase.
     *
     * @param {RepairPhonesRepository} private repairPhonesRepository - The repository for managing phone data.
     */
    constructor(private repairPhonesRepository: RepairPhonesRepository) { }

    /**
     * Executes the phone update operation.
     *
     * @param {UpdateRepairPhoneUseCaseRequest} param - The request object containing phoneId and optional newPhoneName.
     * @throws {ResourceNotFoundError} If the phone with the provided ID is not found.
     */
    async execute({
        phoneId,
        newPhoneName
    }: UpdateRepairPhoneUseCaseRequest): Promise<void> {
        // Find the phone by ID using the injected repository
        const repairPhone = await this.repairPhonesRepository.findById(phoneId);

        // If the phone does not exist, throw a ResourceNotFoundError
        if (!repairPhone) {
            throw new ResourceNotFoundError();
        }

        // Update the phone name if a new name is provided
        if (newPhoneName) {
            repairPhone.name = newPhoneName;
        }

        // Save the updated phone in the database
        await this.repairPhonesRepository.update(repairPhone);
    }
}