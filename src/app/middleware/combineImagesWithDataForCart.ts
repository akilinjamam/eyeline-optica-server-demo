import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import { deleteFile } from "../utils/deleteFile";
import { IProduct } from "../../modules/products/products.types";

const combineImagesWithTextDataForCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const files = req.files as Express.Multer.File[];
	try {
		const textData: IProduct = JSON.parse(req.body.data);

		// Upload new images to Cloudinary
		const newImageUrls: string[] = [];
		for (const file of files) {
			const result = await cloudinary.uploader.upload(file.path, {
				folder: "products",
			});
			newImageUrls.push(result.secure_url);
			deleteFile(file.path); // remove from local storage after upload
		}

		req.body = { ...textData, prescriptionImg: newImageUrls };
		next();
	} catch (error) {
		for (const file of files) {
			deleteFile(file.path); // remove from local storage after upload
		}
		return res.status(400).json({
			success: false,
			message: "data processing error",
			error,
		});
	}
};

export default combineImagesWithTextDataForCart;
