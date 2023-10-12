import { ServicesRepository } from "@/repositories/services-repository";

/**
 * Request interface for the DeleteServiceUseCase.
 */
interface DeleteServiceUseCaseRequest {
  serviceId: string;
}

/**
 * Use case class for deleting a service.
 */
export class DeleteServiceUseCase {
  /**
   * Creates an instance of DeleteServiceUseCase.
   * @param {ServicesRepository} servicesRepository - The repository for services.
   */
  constructor(private servicesRepository: ServicesRepository) { }

  /**
   * Executes the delete service use case.
   *
   * @param {DeleteServiceUseCaseRequest} param - The request containing the service ID to delete.
   * @returns {Promise<void>} A promise that resolves when the service is deleted.
   */
  async execute({
    serviceId,
  }: DeleteServiceUseCaseRequest): Promise<void> {
    // Delete the service by ID using the injected repository    
    await this.servicesRepository.deleteServiceById(serviceId);
  }
}
