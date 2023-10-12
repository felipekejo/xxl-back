import { Prisma, ContactMessage } from "@prisma/client";

/**
 * MessagesRepository interface defines the contract for interacting with the contact message data.
 */
export interface ContactMessagesRepository {
  /**
   * Retrieves a contact message by its ID.
   *
   * @param {string} id - The ID of the contact message.
   * @returns {Promise<ContactMessage | null>} The retrieved contact message, or null if not found.
   */
  findById(id: string): Promise<ContactMessage | null>;

  /**
   * Creates a new contact message.
   *
   * @param {string | null} userId - The ID of the user associated with the message, or null if not associated.
   * @param {Prisma.ContactMessageCreateInput} messageData - The data for creating the contact message.
   * @returns {Promise<ContactMessage>} The created contact message.
   */
  create(userId: string | null, messageData: Prisma.ContactMessageCreateInput): Promise<ContactMessage>;

  /**
   * Retrieves multiple contact messages based on pagination.
   *
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ContactMessage[]>} The retrieved contact messages.
   */
  findMany(page: number): Promise<ContactMessage[]>;

  /**
   * Updates an existing contact message by its ID.
   *
   * @param {string} id - The ID of the contact message to update.
   * @param {Prisma.ContactMessageUpdateInput} data - The updated data for the contact message.
   * @returns {Promise<ContactMessage | null>} The updated contact message, or null if not found.
   */
  update(id: string, data: Partial<Prisma.ContactMessageUpdateInput>): Promise<ContactMessage | null>;

  /**
   * Deletes a contact message by its ID.
   *
   * @param {string} id - The ID of the contact message to delete.
   * @returns {Promise<void>}
   */
  delete(id: string): Promise<void>;
}
