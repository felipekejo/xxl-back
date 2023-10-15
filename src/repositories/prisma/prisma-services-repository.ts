import { prisma } from "@/lib/prisma";
import { Prisma, Service } from "@prisma/client";
import { ServicesRepository } from "../services-repository";

/**
 * PrismaServicesRepository implements the ServicesRepository interface using Prisma ORM.
 */
export class PrismaServicesRepository implements ServicesRepository {
  /**
   * Retrieves a service by its ID.
   *
   * @param {string} serviceId - The ID of the service to retrieve.
   * @returns {Promise<Service | null>} A promise that resolves to the retrieved service or null if not found.
   */
  async getServiceById(serviceId: string): Promise<Service | null> {
    try {
      const service = await prisma.service.findUnique({
        where: {
          id: serviceId,
        },
      });
      return service;
    } catch (error) {
      console.error("Error fetching service by ID:", error);
      return null;
    }
  }

  /**
   * Retrieves a service by its ID and associated phone ID.
   *
   * @param {string} phoneId - The ID of the associated phone.
   * @param {string} serviceId - The ID of the service to retrieve.
   * @returns {Promise<Service | null>} A promise that resolves to the retrieved service or null if not found.
   */
  async getServiceByIdFromPhoneId(phoneId: string, serviceId: string) {
    const service = await prisma.service.findFirst({
      where: {
        id: serviceId,
        phoneId,
      },
    });
    return service;
  }

  /**
   * Retrieves a service by its name and associated phone ID.
   *
   * @param {string} phoneId - The ID of the associated phone.
   * @param {string} serviceName - The name of the service to retrieve.
   * @returns {Promise<Service | null>} A promise that resolves to the retrieved service or null if not found.
   */
  async getServiceByNameFromPhoneId(phoneId: string, serviceName: string) {
    const service = await prisma.service.findFirst({
      where: {
        name: {
          equals: serviceName,
        },
        phoneId,
      },
    });
    return service;
  }

  /**
   * Retrieves all services associated with a phone ID.
   *
   * @param {string} phoneId - The ID of the associated phone.
   * @returns {Promise<Service[]>} A promise that resolves to an array of services.
   */
  async getAllServicesFromPhoneId(phoneId: string) {
    const services = await prisma.service.findMany({
      where: {
        phoneId,
      },
    });
    return services;
  }

  /**
   * Retrieves all services associated with a phone name.
   *
   * @param {string} phoneName - The name of the associated phone.
   * @returns {Promise<Service[]>} A promise that resolves to an array of services.
   */
  async getAllServicesFromPhoneName(phoneName: string) {
    const services = await prisma.service.findMany({
      where: {
        Phone: {
          name: {
            equals: phoneName,
          },
        },
      },
    });
    return services;
  }

  /**
   * Adds a new service to the service array of a phone.
   *
   * @param {string} phoneId - The ID of the associated phone.
   * @param {Prisma.ServiceCreateInput} serviceData - The data for the new service.
   * @returns {Promise<Service>} A promise that resolves to the created service.
   */
  async addNewServiceToPhoneServiceArray(
    phoneId: string,
    serviceData: Prisma.ServiceCreateInput
  ) {
    const service = await prisma.service.create({
      data: {
        ...serviceData,
        Phone: {
          connect: {
            id: phoneId,
          },
        },
      },
    });
    return service;
  }

  /**
   * Updates a service.
   *
   * @param {Service} service - The service to update.
   * @returns {Promise<Service | null>} A promise that resolves to the updated service or null if an error occurs.
   */
  async updateService(service: Service): Promise<Service | null> {
    try {
      const updatedService = await prisma.service.update({
        where: {
          id: service.id,
        },
        data: {
          name: service.name,
          price: service.price,
        },
      });
      return updatedService;
    } catch (error) {
      console.error("Error updating service:", error);
      return null;
    }
  }

  /**
   * Deletes a service by its ID.
   *
   * @param {string} serviceId - The ID of the service to delete.
   */
  async deleteServiceById(serviceId: string): Promise<void> {
    await prisma.service.delete({
      where: {
        id: serviceId,
      },
    });
  }
}
