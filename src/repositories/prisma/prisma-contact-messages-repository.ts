import { ContactMessage, Prisma } from "@prisma/client";
import { ContactMessagesRepository } from "../contact-messages-repository";
import { prisma } from "@/lib/prisma";

/**
 * PrismaContactMessagesRepository implements the ContactMessagesRepository interface using Prisma.
 */
export class PrismaContactMessagesRepository
  implements ContactMessagesRepository
{
  /**
   * Retrieves a contact message by its ID.
   *
   * @param {string} id - The ID of the contact message.
   * @returns {Promise<ContactMessage | null>} The retrieved contact message, or null if not found.
   */
  async findById(id: string): Promise<ContactMessage | null> {
    const message = await prisma.contactMessage.findUnique({
      where: {
        id,
      },
    });

    return message;
  }

  /**
   * Creates a new contact message.
   *
   * @param {string | null} userId - The ID of the user associated with the message, or null if not associated.
   * @param {Prisma.ContactMessageCreateInput} messageData - The data for creating the contact message.
   * @returns {Promise<ContactMessage>} The created contact message.
   */
  async create(
    userId: string | null,
    messageData: Prisma.ContactMessageCreateInput
  ): Promise<ContactMessage> {
    const message = await prisma.contactMessage.create({
      data: {
        ...messageData,
        ...(userId
          ? {
              user: {
                connect: {
                  id: userId,
                },
              },
            }
          : {}),
      },
    });

    return message;
  }

  /**
   * Retrieves multiple contact messages based on pagination.
   *
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ContactMessage[]>} The retrieved contact messages.
   */
  async findMany(page: number): Promise<ContactMessage[]> {
    const messages = await prisma.contactMessage.findMany({
      skip: (page - 1) * 20,
      take: 20,
    });

    return messages;
  }

  /**
   * Retrieves the total count of contact messages.
   *
   * @returns {Promise<number>} The total count of contact messages.
   */
  async count(): Promise<number> {
    const totalCount = await prisma.contactMessage.count();
    return totalCount;
  }

  /**
   * Updates a contact message by its ID.
   *
   * @param {string} id - The ID of the contact message to update.
   * @param {Partial<Prisma.ContactMessageUpdateInput>} data - The updated data for the contact message.
   * @returns {Promise<ContactMessage | null>} The updated contact message, or null if not found.
   */
  async update(
    id: string,
    data: Partial<Prisma.ContactMessageUpdateInput>
  ): Promise<ContactMessage | null> {
    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data,
    });

    return updatedMessage;
  }

  /**
   * Deletes a contact message by its ID.
   *
   * @param {string} id - The ID of the contact message to delete.
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    await prisma.contactMessage.delete({
      where: {
        id,
      },
    });
  }
}
