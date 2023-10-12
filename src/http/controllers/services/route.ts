import { FastifyInstance } from "fastify";
import { addServiceToPhone } from "./addServiceToPhone";
import { listServicesByPhoneId } from "./listServicesByPhoneId";
import { updateService } from "./updateService";
import { deleteService } from "./deleteService";
import { listRepairPhones } from "./listPhones";
import { createRepairPhones } from "./createPhones";
import { createRepair } from "./createRepair";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { deleteRepairPhone } from "./deletePhone";
import { updateRepairPhone } from "./updatePhone";

export async function servicesRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  // Public phone routes
  app.get("/phones", listRepairPhones);

  // Protected phone routes
  app.post("/phones",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    createRepairPhones);
  app.patch("/phones/:phoneId",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    updateRepairPhone);
  app.delete("/phones/:phoneId",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    deleteRepairPhone);

  // Unprotected service routes
  app.get("/services/:phoneId", listServicesByPhoneId);

  // Protected service routes
  app.post("/addService",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    addServiceToPhone);
  app.patch("/services/:serviceId",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    updateService);
  app.delete("/service/:phoneId/:serviceId",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    deleteService);

  // Create Repair route
  app.post("/repairs",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    createRepair);
}