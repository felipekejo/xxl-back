import { PrismaAdvertisementsRepository } from "@/repositories/prisma/prisma-advertisements-repository";
import { UploadSecondAdsUseCase } from "@/use-cases/advertisement/upload-second-ad";
import { s3 } from "@/lib/s3";
import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadSecondAd(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const prismaAdvertisementsRepository = new PrismaAdvertisementsRepository();

  const uploadSecondAdsUseCase = new UploadSecondAdsUseCase(
    prismaAdvertisementsRepository
  );
  const uploadFile = (buffer, name, type) => {
    const params = {
      Body: buffer,
      Bucket: "phone-garage-invoices",
      ContentType: type.mime,
      Key: `secondAd/${name}`,
    };
    return s3.upload(params).promise();
  };
  try {
    const secondAd = await request.file();
    const buffer = await secondAd.toBuffer();
    const uuid = uuidv4();
    const fileName = `${uuid}_${secondAd?.filename}`;
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
    const secondAdStreamed = fs.createReadStream(filePath);
    const type = secondAd.mimetype;
    const data = await uploadFile(secondAdStreamed, fileName, type);

    fs.unlinkSync(filePath);
    await uploadSecondAdsUseCase.execute(data.Location);

    return reply.status(201).send(data.Location);
  } catch (error) {
    console.log("ERRO", error);
  }
}
