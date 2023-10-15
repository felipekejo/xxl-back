import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(
  rolesToVerify: ("ADMIN" | "OWNER" | "CUSTOMER")[]
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;
    if (!rolesToVerify.includes(role) || role === "CUSTOMER") {
      return reply.status(401).send({ message: "Unauthorized!" });
    }
  };
}
