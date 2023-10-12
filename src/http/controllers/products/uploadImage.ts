import { s3 } from "@/lib/s3";
import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadImage(
  request: FastifyRequest,
  reply: FastifyReply
) {
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
    const image = await request.file();

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

    reply.status(200).send(data.Location);
  } catch (err) {
    reply.status(500).send(err);
  }
}
