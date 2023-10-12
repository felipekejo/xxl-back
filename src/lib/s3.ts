import AWS from "aws-sdk";
import { env } from "@/env";

import path from "path";
import crypto from "crypto";

import multerS3 from "multer-s3";
import fastifyMultipart from "fastify-multipart";
import fastify from "fastify";
import multer from "fastify-multer";

export const s3 = new AWS.S3({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_KEY,
});

// const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

// const storageTypes = {
//   local: {
//     destination: (req, file, cb) => {
//       cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
//     },
//     filename: (req, file, cb) => {
//       crypto.randomBytes(16, (err, hash) => {
//         if (err) cb(err);

//         file.key = `${hash.toString("hex")}-${file.filename}`;

//         cb(null, file.key);
//       });
//     },
//   },
//   s3: multerS3({
//     s3: new aws.S3(),
//     bucket: "phone-garage-invoices",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: "public-read",
//     key: (req, file, cb) => {
//       crypto.randomBytes(16, (err, hash) => {
//         if (err) cb(err);

//         const fileName = `${hash.toString("hex")}-${file.filename}`;

//         cb(null, fileName);
//       });
//     },
//   }),
// };

// const server = fastify();

// server.register(fastifyMultipart, { attachFieldsToBody: true });

// server.addHook("onRequest", (req, reply, done) => {
//   if (req.isMultipart()) {
//     const storage = storageTypes[process.env.STORAGE_TYPE];
//     if (!storage) {
//       return done(new Error("Invalid storage type."));
//     }

//     const upload = multer({
//       storage,
//       limits: { fileSize: MAX_SIZE_TWO_MEGABYTES },
//     });

//     upload.any()(req.raw, reply.raw, done);
//   } else {
//     done();
//   }
// });

// server.setErrorHandler((err, req, reply) => {
//   if (err.code === "LIMIT_FILE_SIZE") {
//     reply.code(400).send("File size limit exceeded.");
//   } else if (err.message === "Invalid file type.") {
//     reply.code(400).send("Invalid file type.");
//   } else {
//     reply.send(err);
//   }
// });

// server.listen(3000, (err) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log("Server is running on port 3000");
// });
