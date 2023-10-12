import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateOrderUseCase } from "@/use-cases/order/create-order";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
// import { sendMail } from "../services/sendMailMethod";
import { generatePDF } from "../store/generatePDF";
import { CreateInvoiceUseCase } from "@/use-cases/order/create-invoice";

/**
 * Handles the creation of a new order.
 *
 * @param {FastifyRequest} request - The FastifyRequest object representing the incoming HTTP request.
 * @param {FastifyReply} reply - The FastifyReply object representing the outgoing HTTP response.
 * @returns {FastifyReply} A FastifyReply with appropriate status and message.
 */
export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Define the schema for the request body using Zod.
    const createOrderBodySchema = z.object({
      sessionId: z.string(),
      deliveryAddress: z.string(),
      customer_id: z.string(),
      cart: z.array(
        z.object({
          id: z.string(),
          price: z.number(),
          quantity: z.number(),
          name: z.string(),
          imageUrl: z.string(),
          priceId: z.string(),
        })
      ),
    });
    const { deliveryAddress, customer_id, cart, sessionId } =
      createOrderBodySchema.parse(request.body);
    // TODO: GUSTAVO - To prevent user injection, the items in the cart must be verified against the database here.

    // Initialize the orders repository and the create order use case.
    const ordersRepository = new PrismaOrdersRepository();
    const createOrderUseCase = new CreateOrderUseCase(ordersRepository);

    // Parse and validate the request body against the defined schema.

    // Execute the create order use case.

    const createdOrder = await createOrderUseCase.execute({
      deliveryAddress,
      customer_id,
      cart,
      sessionId,
    });

    // Initialize the users repository and retrieve the user's email by ID.
    const usersRepository = new PrismaUsersRepository();
    const userEmail = await usersRepository.getUserEmailById(customer_id);

    const orderNo = createdOrder.orderNo;
    const pdfUrl = await generatePDF(orderNo);

    if (!pdfUrl) {
      throw new Error("Failed to generate PDF");
    }

    const createInvoiceUseCase = new CreateInvoiceUseCase(ordersRepository);
    await createInvoiceUseCase.execute({ orderNo, pdfUrl });

    // Retrieve the created order by customer ID.
    // const createdOrder = await ordersRepository.findOrderByCustomerId(customer_id);

    // Format the order details.
    // TODO: GUSTAVO - as soon as we have the PDF mechanism, I will need to change the text and also attach the PDF to the email.
    const formattedOrder = `Order Details:
    Order Number: ${createdOrder.orderNo}
    Delivery Address: ${createdOrder.deliveryAddress}
    Total: $${createdOrder.total.toFixed(2)}`;

    // Define the email data.
    // const emailData = {
    //   to: userEmail,
    //   subject: "Order Confirmation",
    //   text: `Your order has been confirmed. ${formattedOrder}`,
    // };

    // Send the confirmation email.
    // sendMail(emailData);

    // Respond with a success message and 201 Created status.
    return reply.status(201).send({ message: "Order created successfully" });
  } catch (error) {
    // If an error occurs, respond with an error message and appropriate status.
    return reply.status(500).send({ error: "Failed to create order" });
  }
}
