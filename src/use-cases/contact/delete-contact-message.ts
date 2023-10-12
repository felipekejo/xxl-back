import { ContactMessagesRepository } from "@/repositories/contact-messages-repository";


interface DeleteMessageUseCaseRequest {    
    messageId: string;
}


export class DeleteMessageUseCase {
    constructor(private messagesRepository: ContactMessagesRepository) { }    


    async execute({ messageId }: DeleteMessageUseCaseRequest): Promise<void> {
        

        await this.messagesRepository.delete(messageId);                
    }
}