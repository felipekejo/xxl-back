import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GenerateInvoiceUseCase } from "@/use-cases/order/generate-invoice";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import ejs from "ejs";
import { z } from "zod";

export async function generateInvoice(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const generateInvoiceBodySchema = z.object({
    orderNo: z.string(),
  });

  const { orderNo } = generateInvoiceBodySchema.parse(request.params);

  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaOrdersRepository = new PrismaOrdersRepository();

  const generateInvoiceRepository = new GenerateInvoiceUseCase(
    prismaUsersRepository,
    prismaOrdersRepository
  );

  const invoiceDetails = await generateInvoiceRepository.execute({ orderNo });
  console.log(invoiceDetails);
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "lib",
    "invoice-generator",
    "invoice.ejs"
  );

  try {
    const html = await ejs.renderFile(filePath, { invoiceDetails });
    reply.header("Content-Type", "text/html").send(html);
  } catch (err) {
    console.error("Error rendering EJS template:", err);
    reply.status(500).send("Internal Server Error");
  }
}
