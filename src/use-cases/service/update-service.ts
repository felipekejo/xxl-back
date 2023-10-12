import { ServicesRepository } from "@/repositories/services-repository";
import { ServiceNotFoundError } from "../errors/service-not-found-error";

/**
 * Represents the request format for the UpdateServiceUseCase.
 */
interface UpdateServiceUseCaseRequest {
  serviceId: string;
  newPrice?: number;
  newServiceName?: string;
}

/**
 * The UpdateServiceUseCase class handles updating service information.
 */
export class UpdateServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) { }

  /**
   * Execute the update service use case.
   *
   * @param {UpdateServiceUseCaseRequest} request - The request containing update details.
   * @throws {ServiceNotFoundError} If the service with the specified ID is not found.
   */
  async execute({
    serviceId,
    newPrice,
    newServiceName,
  }: UpdateServiceUseCaseRequest): Promise<void> {
    // Find the service by ID using the injected repository
    const service = await this.servicesRepository.getServiceById(serviceId);

    // If the service does not exist, throw a ServiceNotFoundError
    if (!service) {
      throw new ServiceNotFoundError();
    }

    // Update the service properties if new values are provided
    if (newPrice !== undefined) {      
      service.price = newPrice;
    }
    if (newServiceName) {
      service.name = newServiceName;
    }

    // Save the updated service in the database
    await this.servicesRepository.updateService(service);
  }
}
