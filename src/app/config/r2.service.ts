import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs/promises";
import { r2Client } from "./r2.config";
import config from "../config";

export const uploadToR2 = async (
  file: Express.Multer.File,
  folder: string,
): Promise<string> => {
  const fileExtension = path.extname(file.originalname);

  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExtension}`;

  const key = `${folder}/${fileName}`;

  const fileBuffer = await fs.readFile(file.path);

  await r2Client.send(
    new PutObjectCommand({
      Bucket: config.r2_bucket_name!,
      Key: key,
      Body: fileBuffer,
      ContentType: file.mimetype,
    }),
  );

  return `${config.r2_public_url}/${key}`;
};

export const deleteFromR2 = async (imageUrl: string) => {
  try {
    const publicUrl = config.r2_public_url;

    const key = imageUrl.replace(`${publicUrl}/`, "");

    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: config.r2_bucket_name!,
        Key: key,
      }),
    );
  } catch (error) {
    console.log("R2 delete failed", imageUrl, error);
  }
};
