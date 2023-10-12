import { OrdersRepository } from "@/repositories/orders-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetInvoiceUseCaseRequest {
  orderNo: string;
}

interface GetInvoiceUseCaseResponse {
  pdfUrl: string;
}

export class GetInvoiceUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderNo,
  }: GetInvoiceUseCaseRequest): Promise<GetInvoiceUseCaseResponse> {
    const pdfUrl = await this.ordersRepository.getInvoiceByOrderNo(orderNo);

    if (!pdfUrl) {
      throw new ResourceNotFoundError();
    }

    return { pdfUrl };
  }
}
