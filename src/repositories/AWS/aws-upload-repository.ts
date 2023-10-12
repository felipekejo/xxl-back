import { s3 } from "@/lib/s3";
import { UploadsRepository } from "../uploads-repository";
import fs from "fs";

interface Params {
  Bucket: string;
  Key: string;
  Body: fs.ReadStream;
}
export class AWSUploadRepository implements UploadsRepository {
  async uploadImage(params: Params) {
    await s3.upload(params).promise();
  }
}
