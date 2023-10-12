import { FastifyInstance } from "fastify";
import { grantAdminRights } from "./grantAdminRights";
import { removeAdminRights } from "./removeAdminRights";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function ownerRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.patch(
    "/grantAdminRights",
    { onRequest: [verifyUserRole(["OWNER"])] },
    grantAdminRights
  );

  app.patch(
    "/removeAdminRights",
    { onRequest: [verifyUserRole(["OWNER"])] },
    removeAdminRights
  );
}
