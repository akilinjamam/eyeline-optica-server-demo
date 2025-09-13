import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import { deleteFile } from "../utils/deleteFile";
const oldCombineImagesWithTextData = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const files = req.files as Express.Multer.File[];
		const textData = JSON.parse(req.body.data);
		const imageUrls: string[] = [];

		for (const file of files) {
			const result = await cloudinary.uploader.upload(file.path, {
				folder: "products",
			});
			imageUrls.push(result.secure_url);
			deleteFile(file.path);
		}

		req.body = { images: imageUrls, ...textData };
		next();
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: "data processing error",
			error: error,
		});
	}
};

export default oldCombineImagesWithTextData;
