import fs from "fs";

interface Params {
  Bucket: string;
  Key: string;
  Body: fs.ReadStream;
  ContentType: any;
}

export interface UploadsRepository {
  uploadImage(params: Params): Promise<void>;
}
