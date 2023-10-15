import { Order, Prisma } from "@prisma/client";
import { OrdersRepository } from "../orders-repository";
import { prisma } from "@/lib/prisma";

/**
 * Implementation of the OrdersRepository interface using Prisma.
 */
export class PrismaOrdersRepository implements OrdersRepository {
  async getOrderBySessionId(sessionId: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        sessionId,
      },
    });
    return order;
  }

  async findLineItemsByOrderNo(orderNo: string) {
    const lineItems = await prisma.itemLine.findMany({
      where: {
        order_id: orderNo,
      },
    });

    return lineItems;
  }

  /**
   * Retrieve all orders.
   * @returns {Promise<Order[]>} A promise that resolves to an array of orders.
   */
  async findAll() {
    const orders = await prisma.order.findMany();
    return orders;
  }

  async findAllByUserId(userId: string) {
    const orders = await prisma.order.findMany({
      where: {
        customer_id: userId,
      },
    });
    return orders;
  }

  /**
   * Retrieve an order by its unique identifier (orderNo).
   * @param {string} orderNo - The unique identifier of the order.
   * @returns {Promise<Order | null>} A promise that resolves to the found order or null if not found.
   */
  async findByOrderNo(orderNo: string) {
    const order = await prisma.order.findUnique({
      where: {
        orderNo,
      },
    });
    return order;
  }

  /**
   * Create a new order.
   * @param {Prisma.OrderCreateInput} data - The data to create the order.
   * @returns {Promise<Order>} A promise that resolves to the created order.
   */
  async create(data: Prisma.OrderCreateInput) {
    console.log("data", data);
    const order = await prisma.order.create({
      data,
    });
    return order;
  }

  /**
   * Update an order's information.
   * @param {string} orderNo - The unique identifier of the order.
   * @param {Prisma.OrderUpdateInput} data - The data to update the order.
   * @returns {Promise<Order>} A promise that resolves to the updated order.
   */
  async update(orderNo: string, data: Prisma.OrderUpdateInput) {
    const updatedOrder = await prisma.order.update({
      where: { orderNo },
      data,
    });

    return updatedOrder;
  }

  /**
   * Delete an order by its unique identifier (orderNo).
   * @param {string} orderNo - The unique identifier of the order.
   * @returns {Promise<void>} A promise that resolves when the order is deleted.
   */
  async delete(orderNo: string) {
    await prisma.order.delete({
      where: {
        orderNo,
      },
    });
  }

  async getInvoiceByOrderNo(orderNo: string) {
    const invoice = await prisma.invoice.findFirst({
      where: {
        order_id: orderNo,
      },
    });
    return invoice?.pdf_url || null;
  }

  async createInvoice(data: Prisma.InvoiceCreateInput) {
    const invoice = await prisma.invoice.create({
      data,
    });
    return invoice.pdf_url;
  }

  // Inside PrismaOrdersRepository class
  async updateOrderStatus(
    orderNo: string,
    status: "Received" | "Sent" | "Delivered"
  ) {
    // Check if the order exists
    const orderExists = await prisma.order.findUnique({
      where: {
        orderNo,
      },
    });

    if (!orderExists) {
      throw new Error("Order not found");
    }

    // Update the status of the order
    const updatedOrder = await prisma.order.update({
      where: { orderNo },
      data: {
        status,
      },
    });

    return updatedOrder;
  }
}
