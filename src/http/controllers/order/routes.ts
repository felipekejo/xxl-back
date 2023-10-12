import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { createOrder } from "../order/createOrder";
import { deleteOrder } from "../order/deleteOrder";
import { getAllOrders } from "../order/getAllOrders";
import { getAllOrdersByUserId } from "../order/getAllOrdersByUserId";
import { getOrderByOrderNo } from "./getAllOrdersByOrderNo";
import { getInvoice } from "./getInvoices";
import { updateOrderStatus } from "./updateOrderStatus";

/**
 * Configures and defines routes related to orders.
 *
 * @param {FastifyInstance} app - The Fastify instance to configure the routes on.
 */
export async function orderRoutes(app: FastifyInstance) {
  // Order routes

  /**
   * Get all orders.
   *
   * @route GET /orders
   */
  app.get(
    "/orders",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    getAllOrders
  );

  /**
   * Get all orders by user ID.
   *
   * @route GET /orders/user/:userId
   * @param {string} userId - The ID of the user.
   */
  app.get<{ Params: { userId: string } }>(
    // TODO: this might need a second route. One for admins to see all orders of a particular user, and one for users to see their own orders.
    // The way it is now, any registered user can see all the orders from a different user as long as they have their ID simply by putting in the url bar.
    "/orders/user/:userId",
    { onRequest: [verifyJWT] },
    getAllOrdersByUserId
  );

  /**
   * Get an order by order number.
   *
   * @route GET /orders/:orderNo
   * @param {string} orderNo - The order number.
   */
  app.get<{ Params: { orderNo: string } }>(
    "/orders/:orderNo",
    { onRequest: [verifyJWT] },
    getOrderByOrderNo
  );

  /**
   * Create a new order.
   *
   * @route POST /orders
   */
  app.post(
    "/orders",
    { onRequest: [verifyJWT] },
    createOrder
  );

  /**
     * Update the status of an order by order number.
     *
     * @route PUT /orders/:orderNo/status
     * @param {string} orderNo - The order number.
     */
  app.put<{ Params: { orderNo: string }, Body: { status: string } }>(
    "/orders/:orderNo/status",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    updateOrderStatus
  );

  /**
   * Delete an order by ID.
   *
   * @route DELETE /orders/:id
   * @param {string} id - The ID of the order to delete.
   */
  app.delete<{ Params: { id: string } }>(
    "/orders/:id",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    deleteOrder
  );

  app.get("/invoices/:orderNo", { onRequest: [verifyJWT] }, getInvoice);
}
