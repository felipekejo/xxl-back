import { OrdersRepository } from "@/repositories/orders-repository";

interface CreateInvoiceUseCaseRequest {
  orderNo: string;
  pdfUrl: string;
}

export class CreateInvoiceUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ orderNo, pdfUrl }: CreateInvoiceUseCaseRequest) {
    await this.ordersRepository.createInvoice({
      order_id: orderNo,
      pdf_url: pdfUrl,
    });
  }
}
