import { PrismaAdvertisementsRepository } from "@/repositories/prisma/prisma-advertisements-repository";
import { UploadBannersUseCase } from "@/use-cases/advertisement/upload-banners";

import { s3 } from "@/lib/s3";
import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadBanner(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const prismaAdvertisementsRepository = new PrismaAdvertisementsRepository();

  const uploadBannersUseCase = new UploadBannersUseCase(
    prismaAdvertisementsRepository
  );

  const uploadFile = (buffer, name, type) => {
    const params = {
      Body: buffer,
      Bucket: "phone-garage-invoices",
      ContentType: type.mime,
      Key: `banner/${name}`,
    };
    return s3.upload(params).promise();
  };
  try {
    const banner = await request.file();
    const buffer = await banner.toBuffer();
    const uuid = uuidv4();
    const fileName = `${uuid}_${banner?.filename}`;
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
    const bannerStreamed = fs.createReadStream(filePath);
    const type = banner.mimetype;
    const data = await uploadFile(bannerStreamed, fileName, type);

    fs.unlinkSync(filePath);
    await uploadBannersUseCase.execute(data.Location);
    reply.status(200).send(data.Location);
  } catch (error) {
    console.log("ERRO", error);
  }
}
