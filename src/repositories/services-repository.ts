import { Prisma, Service } from "@prisma/client";

/**
 * ServicesRepository interface defines the contract for interacting with service data.
 */
export interface ServicesRepository {
  /**
   * Retrieves a service by its ID.
   *
   * @param {string} serviceId - The ID of the service to retrieve.
   * @returns {Promise<Service | null>} A promise that resolves to the retrieved service or null if not found.
   */
  getServiceById(serviceId: string): Promise<Service | null>;

  /**
   * Retrieves a service by its ID from a specific phone ID.
   *
   * @param {string} phoneId - The ID of the associated phone.
   * @param {string} serviceId - The ID of the service to retrieve.
   * @returns {Promise<Service | null>} A promise that resolves to the retrieved service or null if not found.
   */
  getServiceByIdFromPhoneId(
    phoneId: string,
    serviceId: string
  ): Promise<Service | null>;

  /**
   * Retrieves a service by its name from a specific phone ID.
   *
   * @param {string} phoneId - The ID of the associated phone.
   * @param {string} serviceName - The name of the service to retrieve.
   * @returns {Promise<Service | null>} A promise that resolves to the retrieved service or null if not found.
   */
  getServiceByNameFromPhoneId(
    phoneId: string,
    serviceName: string
  ): Promise<Service | null>;

  /**
   * Retrieves all services associated with a specific phone ID.
   *
   * @param {string} phoneId - The ID of the associated phone.
   * @returns {Promise<Service[]>} A promise that resolves to an array of services.
   */
  getAllServicesFromPhoneId(phoneId: string): Promise<Service[]>;

  /**
   * Retrieves all services associated with a specific phone name.
   *
   * @param {string} phoneName - The name of the associated phone.
   * @returns {Promise<Service[]>} A promise that resolves to an array of services.
   */
  getAllServicesFromPhoneName(phoneName: string): Promise<Service[]>;

  /**
   * Adds a new service to the service array of a specific phone ID.
   *
   * @param {string} phoneId - The ID of the associated phone.
   * @param {Prisma.ServiceCreateInput} serviceData - The data for the new service.
   * @returns {Promise<Service>} A promise that resolves to the created service.
   */
  addNewServiceToPhoneServiceArray(
    phoneId: string,
    serviceData: Prisma.ServiceCreateInput
  ): Promise<Service>;

  /**
   * Deletes a service by its ID.
   *
   * @param {string} serviceId - The ID of the service to delete.
   * @returns {Promise<void>} A promise that resolves when the service is deleted.
   */
  deleteServiceById(serviceId: string): Promise<void>;

  /**
   * Updates the properties of a service.
   *
   * @param {Service} service - The service to update.
   * @returns {Promise<Service | null>} A promise that resolves to the updated service or null if an error occurs.
   */
  updateService(service: Service): Promise<Service | null>;
}
