import { Prisma, Order, ItemLine } from "@prisma/client";

// Define the input interface for updating an order
export interface OrderUpdateInput {
  status?: "Received" | "Sent" | "Delivered";
  orderDate?: Date;
  deliveryAddress?: string;
  total?: number;
}

// Repository interface for orders
export interface OrdersRepository {
  // Retrieve all orders
  findAll(): Promise<Order[]>;

  // Retrieve all orders of a particular user
  findAllByUserId(userId: string): Promise<Order[]>;

  // Retrieve an order by its unique identifier (orderNo)
  findByOrderNo(orderNo: string): Promise<Order | null>;

  // Create a new order
  create(data: Prisma.OrderCreateInput): Promise<Order>;

  // Update an order's information
  update(orderNo: string, data: Prisma.OrderUpdateInput): Promise<Order>;

  // Delete an order by its unique identifier (orderNo)
  delete(orderNo: string): Promise<void>;

  // Retrieve all line items from an order by its unique identifier (orderNo)
  findLineItemsByOrderNo(orderNo: string): Promise<ItemLine[] | null>;

  // Retrieve an order by its unique identifier (orderNo)
  getInvoiceByOrderNo(orderNo: string): Promise<string | null>;

  // Create an invoice
  createInvoice(data: Prisma.InvoiceCreateInput): Promise<string | null>;

  // Get order by session id
  getOrderBySessionId(sessionId: string): Promise<Order | null>;

  // Update the status of an order by its unique identifier (orderNo)
  updateOrderStatus(orderNo: string, status: "Received" | "Sent" | "Delivered"): Promise<Order>;
}
