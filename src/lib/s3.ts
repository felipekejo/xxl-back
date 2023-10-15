import AWS from "aws-sdk";
import { env } from "@/env";

export const s3 = new AWS.S3({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_KEY,
});
