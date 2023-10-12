import { Prisma } from "@prisma/client";
import { ContactMessagesRepository } from "@/repositories/contact-messages-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

/**
 * Request interface for the UpdateContactMessageUseCase.
 */
interface UpdateContactMessageUseCaseRequest {
    messageId: string;
    newMessageContent?: string;
    replied?: boolean;
}

/**
 * Use case for updating a contact message.
 */
export class UpdateContactMessageUseCase {
    /**
     * Create an instance of UpdateContactMessageUseCase.
     * @param contactMessagesRepository - The repository for accessing contact messages.
     */
    constructor(private contactMessagesRepository: ContactMessagesRepository) { }

    /**
     * Execute the update contact message use case.
     * @param request - The update contact message request.
     * @throws ResourceNotFoundError - If the contact message is not found.
     */
    async execute(request: UpdateContactMessageUseCaseRequest): Promise<void> {
        const { messageId, newMessageContent, replied } = request;

        // Find the contact message by ID using the injected repository
        const contactMessage = await this.contactMessagesRepository.findById(messageId);

        // If the contact message does not exist, throw a ResourceNotFoundError
        if (!contactMessage) {
            throw new ResourceNotFoundError();
        }

        // Prepare the updated data for the contact message
        const updatedData: Partial<Prisma.ContactMessageUpdateInput> = {};

        if (newMessageContent) {
            updatedData.message = newMessageContent;
        }

        if (replied !== undefined) {
            updatedData.replied = replied;
        }

        // Update the contact message using the repository
        await this.contactMessagesRepository.update(messageId, updatedData);
    }
}
