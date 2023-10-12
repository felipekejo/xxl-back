import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { GetInvoiceUseCase } from "@/use-cases/order/get-invoice";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getInvoice(request: FastifyRequest, reply: FastifyReply) {
  // Define the expected shape of the request parameters using the zod library
  const invoiceParamsSchema = z.object({
    id: z.string(),
  });
  // Parse the ID parameter from the request
  const { id } = invoiceParamsSchema.parse(request.params);
  // Create a new instance of the StripeOrdersRepository
  const ordersRepository = new PrismaOrdersRepository();
  // Create a new instance of the GetProductUseCase, passing in the products repository

  const getInvoice = new GetInvoiceUseCase(ordersRepository);

  const { pdfUrl } = await getInvoice.execute({ orderNo: id });

  return reply.status(200).send({ pdfUrl });
}
