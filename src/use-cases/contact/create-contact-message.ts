import { ContactMessagesRepository } from "@/repositories/contact-messages-repository";
import { Prisma } from "@prisma/client";

/**
 * Request interface for the CreateMessageUseCase.
 */
interface CreateMessageUseCaseRequest {
    /**
     * The ID of the user associated with the message, or null if not associated.
     */
    userId: string | null;

    /**
     * The data for creating the contact message.
     */
    messageData: Prisma.ContactMessageCreateInput;
}

/**
 * CreateMessageUseCase class handles the creation of contact messages.
 */
export class CreateMessageUseCase {
    /**
     * Initializes a new instance of CreateMessageUseCase.
     * 
     * @param {ContactMessagesRepository} messagesRepository - The repository for managing contact messages.
     */
    constructor(private messagesRepository: ContactMessagesRepository) { }

    /**
     * Executes the CreateMessageUseCase.
     *
     * @param {CreateMessageUseCaseRequest} param - The parameters for creating the contact message.
     * @returns {Promise<ContactMessage>} The created contact message.
     */
    async execute({ userId, messageData }: CreateMessageUseCaseRequest) {
        try {
            // Call the create method of the messages repository to create the message
            const createdMessage = await this.messagesRepository.create(userId, messageData);
            return createdMessage;
        } catch (error) {
            console.error(error);
        }
    }
}
