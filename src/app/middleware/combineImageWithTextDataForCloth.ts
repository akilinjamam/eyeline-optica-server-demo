import { Request, Response, NextFunction } from "express";
import { deleteFileAsync } from "../utils/deleteFileAsync";
import { deleteFromR2, uploadToR2 } from "../config/r2.service";

interface IProductCreatePayload {
  name: string;
  slug?: string;
  sku: string;
  category: string;
  unit?: "piece" | "meter" | "yard";
  images?: string[];
  lowStockAlert?: number;
}

const combineImagesWithTextDataForCloth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const files = (req.files as Express.Multer.File[]) || [];
  const uploadedUrls: string[] = [];

  try {
    if (!req.body?.data) {
      return res.status(400).json({
        success: false,
        message: "Missing product payload in req.body.data",
      });
    }

    const parsedData: IProductCreatePayload = JSON.parse(req.body.data);
    const folderPrefix = `fcb/cloth/${(parsedData.category || "general")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")}`;

    // Upload files to Cloudflare R2 in parallel and clean up local temp files
    const results = await Promise.all(
      files.map(async (file) => {
        try {
          const url = await uploadToR2(file, folderPrefix);
          if (file.path) {
            await deleteFileAsync(file.path);
          }
          return url;
        } catch (err) {
          console.error(`R2 upload failed for ${file.originalname}:`, err);
          if (file.path) {
            await deleteFileAsync(file.path).catch(() => null);
          }
          return null;
        }
      }),
    );

    for (const url of results) {
      if (url) {
        uploadedUrls.push(url);
      }
    }

    const existingImages = Array.isArray(parsedData.images)
      ? parsedData.images
      : [];
    const finalPayload: IProductCreatePayload = {
      ...parsedData,
      images: [...existingImages, ...uploadedUrls],
    };

    // Match your validateRequest middleware expectation (supports both req.body.field and req.body.body.field)
    req.body = {
      ...finalPayload,
      body: finalPayload,
    };

    return next();
  } catch (error) {
    // Roll back any R2 files already uploaded in this failed request
    if (uploadedUrls.length > 0) {
      await Promise.all(
        uploadedUrls.map((url) => deleteFromR2(url).catch(() => null)),
      );
    }

    // Clean up any remaining local Multer files
    if (files.length > 0) {
      await Promise.all(
        files.map((file) => deleteFileAsync(file.path).catch(() => null)),
      );
    }

    return res.status(400).json({
      success: false,
      message: "Failed to process product data and upload images",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export default combineImagesWithTextDataForCloth;
