import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { changePassword } from "./changePassword";
import { generateKeyForgotPw } from "./generateKeyForgotPwUseCase";
import { resetPassword } from "./resetPassword";
import { deleteUser } from "./deleteUser";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refreshToken } from "./refreshToken";
import { removeToken } from "./removeToken";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.patch("/changePassword", changePassword);
  app.post("/getResetKey", generateKeyForgotPw);
  app.patch("/resetPassword", resetPassword);

  // Protected route
  app.get("/profile", { onRequest: [verifyJWT] }, profile);
  app.delete("/deleteUser/:userId", { onRequest: [verifyJWT] }, deleteUser);

  // Token routes
  app.post("/refresh", refreshToken);
  app.get("/logout", removeToken);
}
