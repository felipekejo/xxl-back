import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { mailRoutes } from "./http/controllers/mail/routes";
import { messageRoutes } from "./http/controllers/message/routes";
import { adminRoutes } from "./http/controllers/protectedRoles/admin/routes";
import { ownerRoutes } from "./http/controllers/protectedRoles/owner/routes";
import { servicesRoutes } from "./http/controllers/services/route";
import { storeRoutes } from "./http/controllers/store/routes";
import { usersRoutes } from "./http/controllers/users/routes";
import { productRoutes } from "./http/controllers/products/routes";
import { orderRoutes } from "./http/controllers/order/routes";
import fastifyMultipart from "@fastify/multipart";
import formBody from "@fastify/formbody";
import { advertisementRoutes } from "./http/controllers/advertisement/routes";

// Initializing the Fastify application
export const app = fastify({
  logger: true,
  bodyLimit: 30 * 1024 * 1024,
});

// Registering the CORS plugin to handle cross-origin requests
app.register(cors, {
  origin: true,
  credentials: true,
});

app.register(fastifyMultipart);

// app.register(multer.contentParser);

// Registering the JWT plugin to handle tokens
app.register(fastifyJwt, {
  secret: "secret2", // TODO: move to .env and import the value
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

// app.register(fileUpload);

// Registering the plugin to handle cookies in the backend
app.register(fastifyCookie);
app.register(formBody);
// Registering the fastify-mailer plugin with the transporter options
app.register(require("fastify-mailer"), {
  defaults: { from: "PhoneGarage <testxxlpresentation@hotmail.com>" }, // TODO: move to .env
  transport: {
    host: "outlook.office365.com", // TODO: move to .env
    port: 587, // TODO: move to .env
    secure: false, // I can't make it work with this on. Still, it's valid and passes the verifications.
    auth: {
      user: "testxxlpresentation@hotmail.com", // TODO: move to .env
      pass: "XxlPresentation1!", // TODO: move to .env
    },
  },
});

// Registering the routes of the application
app.register(usersRoutes);
app.register(servicesRoutes);
app.register(ownerRoutes);
app.register(adminRoutes);
app.register(messageRoutes);
app.register(mailRoutes);
app.register(productRoutes);
app.register(orderRoutes);
app.register(storeRoutes);
app.register(advertisementRoutes);

// Setting up the error handler
app.setErrorHandler((error, _, reply) => {
  if (error.code === "FST_JWT_NO_AUTHORIZATION_IN_COOKIE") {
    return reply.status(401).send({
      message: "Invalid JWT token.",
      code: error.code,
    });
  }

  // Handling validation errors thrown by Zod
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  // Logging the error in the console in development mode
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // Here we should log to an external tool like Datadog/NewRelic/Sentry, just in production
  }

  // Returning a 500 error for internal server errors
  return reply.status(500).send({ message: "Internal server error" });
});
