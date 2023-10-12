import { FastifyInstance } from "fastify";
import { checkOut } from "./checkOutSession";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { generateInvoice } from "./generateInvoice";

import { getCheckoutProducts } from "./getCheckoutProducts";

export async function storeRoutes(app: FastifyInstance) {
  app.post("/session-checkout", { onRequest: [verifyJWT] }, checkOut);
  app.get("/invoice/:orderNo", generateInvoice);

  app.get(
    "/getCheckoutProducts/:id",
    { onRequest: [verifyJWT] },
    getCheckoutProducts
  );
}
