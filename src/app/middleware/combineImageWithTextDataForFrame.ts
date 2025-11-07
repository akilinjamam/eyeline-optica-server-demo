import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import { deleteFile } from "../utils/deleteFile";
import { IProduct } from "../../modules/products/products.types";

const combineImagesWithTextDataForFrame = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const files = req.files as Express.Multer.File[];

	try {
		const textData: IProduct = JSON.parse(req.body.data);
		const { otherImages: oldOtherImages, ...remainingTextData } = textData;

		// Group uploaded files by fieldname
		const filesByField: Record<string, Express.Multer.File[]> = {};
		for (const file of files) {
			const key = file.fieldname;
			if (!filesByField[key]) filesByField[key] = [];
			filesByField[key].push(file);
		}

		const uploadedOtherImages = [];

		if (Array.isArray(textData.otherImages)) {
			for (let i = 0; i < textData.otherImages.length; i++) {
				const group = textData.otherImages[i];
				const groupFiles = filesByField[`otherImages_${i}`] || [];
				const uploadedUrls: string[] = [];

				// Upload new files
				for (const file of groupFiles) {
					const result = await cloudinary.uploader.upload(file.path, {
						folder: "products/variants",
					});
					uploadedUrls.push(result.secure_url);
					deleteFile(file.path);
				}

				// Merge or replace logic
				let finalGroupImages: string[] = [];

				if (req.method === "PUT") {
					// Find old version of this group (if it exists)
					const oldGroup = oldOtherImages?.find((g: any) => g._id?.toString() === group?._id);

					// Get existing images (after possible deletions)
					const remainingOldImages = Array.isArray(group?.imagesToKeep)
						? group?.imagesToKeep
						: oldGroup?.images || [];

					// Combine kept + new
					finalGroupImages = [...remainingOldImages, ...uploadedUrls];
				} else {
					finalGroupImages = uploadedUrls;
				}

				uploadedOtherImages.push({
					colorName: group?.colorName,
					fromColor: group?.fromColor,
					toColor: group?.toColor,
					images: finalGroupImages,
				});
			}
		}

		// ------------------------
		// Final result
		// ------------------------
		req.body = {
			...remainingTextData,
			otherImages: uploadedOtherImages,
		};

		next();
	} catch (error) {
		if (files) files.forEach((file) => deleteFile(file.path));

		return res.status(400).json({
			success: false,
			message: "Data processing error",
			error,
		});
	}
};

export default combineImagesWithTextDataForFrame;
