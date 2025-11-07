import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import { deleteFileAsync } from "../utils/deleteFileAsync";
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
			const key = file?.fieldname;
			if (!file?.fieldname) continue;
			if (!filesByField[key]) filesByField[key] = [];
			filesByField[key].push(file);
		}

		const uploadedOtherImages: any[] = [];

		if (Array.isArray(textData.otherImages)) {
			for (let i = 0; i < textData.otherImages.length; i++) {
				const group = textData.otherImages[i];
				const groupField = `otherImages_${i}`;
				const groupFiles = filesByField[groupField] || [];

				// ✅ Upload files for this group in parallel
				const uploadedUrls = await Promise.all(
					groupFiles.map(async (file) => {
						try {
							const result = await cloudinary.uploader.upload(file.path, {
								folder: "products/variants",
							});
							return result.secure_url;
						} catch (err) {
							console.error(`Upload failed for ${file.path}:`, err);
							return null;
						} finally {
							await deleteFileAsync(file.path);
						}
					})
				).then((urls) => urls.filter(Boolean)); // remove nulls

				let finalGroupImages: string[] = [];

				if (req.method === "PUT") {
					const oldGroup = oldOtherImages?.find((g: any) => g._id?.toString() === group?._id);

					const remainingOldImages: string[] = Array.isArray(group?.imagesToKeep)
						? group.imagesToKeep
						: oldGroup?.images || [];

					finalGroupImages = [...remainingOldImages, ...(uploadedUrls as string[])];
				} else {
					finalGroupImages = uploadedUrls as string[];
				}

				uploadedOtherImages.push({
					_id: group?._id,
					colorName: group?.colorName,
					fromColor: group?.fromColor,
					toColor: group?.toColor,
					images: finalGroupImages,
				});
			}
		}

		req.body = {
			...remainingTextData,
			otherImages: uploadedOtherImages,
		};

		next();
	} catch (error) {
		if (files?.length) {
			await Promise.all(files.map((f) => deleteFileAsync(f.path)));
		}

		return res.status(400).json({
			success: false,
			message: "Data processing error",
			error,
		});
	}
};

export default combineImagesWithTextDataForFrame;
