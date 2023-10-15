import { prisma } from "@/lib/prisma";
import { Phone, Prisma } from "@prisma/client";
import { RepairPhonesRepository } from "../phones-repository";

/**
 * PrismaRepairPhonesRepository implements the RepairPhonesRepository interface using Prisma ORM.
 */
export class PrismaRepairPhonesRepository implements RepairPhonesRepository {
  /**
   * Retrieves multiple phones based on pagination.
   *
   * @param {number} page - The page number for pagination.
   * @returns {Promise<Phone[]>} A promise that resolves to an array of phones.
   */
  async findMany(page: number): Promise<Phone[]> {
    const phones = await prisma.phone.findMany({
      skip: (page - 1) * 20,
      take: 20,
    });
    return phones;
  }

  /**
   * Retrieves a phone by its ID.
   *
   * @param {string} id - The ID of the phone to retrieve.
   * @returns {Promise<Phone | null>} A promise that resolves to the retrieved phone or null if not found.
   */
  async findById(id: string): Promise<Phone | null> {
    const phone = await prisma.phone.findUnique({
      where: {
        id,
      },
    });
    return phone;
  }

  /**
   * Retrieves a phone by its name.
   *
   * @param {string} name - The name of the phone to retrieve.
   * @returns {Promise<Phone | null>} A promise that resolves to the retrieved phone or null if not found.
   */
  async findByName(name: string): Promise<Phone | null> {
    const phone = await prisma.phone.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    });
    return phone;
  }

  /**
   * Creates a new phone.
   *
   * @param {Prisma.PhoneCreateInput} data - The data for the new phone.
   * @returns {Promise<Phone>} A promise that resolves to the created phone.
   */
  async create(data: Prisma.PhoneCreateInput): Promise<Phone> {
    const phone = await prisma.phone.create({
      data,
    });
    return phone;
  }

  /**
   * Updates a phone's name.
   *
   * @param {Phone} phone - The phone to update.
   * @returns {Promise<Phone | null>} A promise that resolves to the updated phone or null if an error occurs.
   */
  async update(phone: Phone): Promise<Phone | null> {
    try {
      const updatedPhone = await prisma.phone.update({
        where: {
          id: phone.id,
        },
        data: {
          name: phone.name,
        },
      });
      return updatedPhone;
    } catch (error) {
      console.error("Error updating phone:", error);
      return null;
    }
  }

  /**
   * Deletes a phone by its ID.
   *
   * @param {string} repairPhoneId - The ID of the phone to delete.
   */
  async delete(repairPhoneId: string) {
    try {
      await prisma.phone.delete({
        where: {
          id: repairPhoneId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
