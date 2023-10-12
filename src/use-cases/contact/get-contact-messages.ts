import { ContactMessagesRepository } from "@/repositories/contact-messages-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ContactMessage as PrismaContactMessage } from ".prisma/client";

interface ContactMessage extends PrismaContactMessage { }

// Define the request interface for the use case
interface GetMessagesUseCaseRequest {
    page: number;
}

// Define the response interface for the use case
interface GetMessagesUseCaseResponse {
    messages: ContactMessage[];
}

// Define the use case class
export class GetMessagesUseCase {
    constructor(private messagesRepository: ContactMessagesRepository) { }

    // Define the execute method for the use case
    async execute({
        page,
    }: GetMessagesUseCaseRequest): Promise<GetMessagesUseCaseResponse> {
        // Find the messages using the injected repository
        const messages = await this.messagesRepository.findMany(page);

        // If the messages are not found, throw a ResourceNotFoundError
        if (!messages) {
            throw new ResourceNotFoundError();
        }

        // Return the messages in a response object
        return {
            messages,
        };
    }
}