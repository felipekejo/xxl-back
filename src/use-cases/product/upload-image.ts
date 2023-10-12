import { s3 } from "@/lib/s3";
import { UploadsRepository } from "@/repositories/uploads-repository";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

interface UploadImageUseCaseRequest {
  files: any;
}

export class UploadImageUseCase {
  constructor(private uploadsRepository: UploadsRepository) {}

  async execute(image: any) {
    const uploadFile = (buffer, name, type) => {
      const params = {
        Body: buffer,
        Bucket: "phone-garage-invoices",
        ContentType: type.mime,
        Key: `images/${name}`,
      };
      return s3.upload(params).promise();
    };
    try {
      const buffer = await image.toBuffer();
      const uuid = uuidv4();
      const fileName = `${uuid}_${image?.filename}`;
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "images",
        fileName
      );
      fs.writeFileSync(filePath, buffer);
      const imageStreamed = fs.createReadStream(filePath);
      const type = image.mimetype;
      const data = await uploadFile(imageStreamed, fileName, type);

      fs.unlinkSync(filePath);

      return data.Location;
    } catch (err) {
      console.log(err);
    }
  }
}
