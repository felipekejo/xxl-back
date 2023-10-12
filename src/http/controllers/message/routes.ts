import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { createContactMessage } from "./createContactMessage";
import { deleteContactMessage } from "./deleteContactMessage";
import { listContactMessages } from "./listContactMessages";
import { replyContactMessage } from "./replyContactMessage";
import { updateContactMessage } from "./updateContactMessage";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function messageRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.post("/contactMessage", createContactMessage);

  // Contact Messages routes
  app.get(
    "/contactMessages",
    { onRequest: [verifyUserRole(["ADMIN", "OWNER"])] },
    listContactMessages
  );

  app.patch(
    "/contactMessage",
    { onRequest: [verifyUserRole(["ADMIN", "OWNER"])] },
    updateContactMessage
  );
  app.delete(
    "/contactMessage/:messageId",
    { onRequest: [verifyUserRole(["ADMIN", "OWNER"])] },
    deleteContactMessage
  );
  app.post(
    "/replyMessage",
    { onRequest: [verifyUserRole(["ADMIN", "OWNER"])] },
    replyContactMessage
  );
}