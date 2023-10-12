import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { listUsers } from "./listUsers";

export async function adminRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.get(
    "/listUsers",
    { onRequest: [verifyUserRole(["ADMIN", "OWNER"])] },
    listUsers
  );
}
