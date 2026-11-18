import { Request, Response, NextFunction } from "express";
import { deleteFileAsync } from "../utils/deleteFileAsync";
import { IProduct } from "../../modules/products/products.types";
import { deleteFromR2, uploadToR2 } from "../config/r2.service";

const combineImagesWithTextDataForFrame = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const files = req.files as Express.Multer.File[];

	try {
		const textData: IProduct = JSON.parse(req.body.data);
		const { otherImages: oldOtherImages, deletableImgUrls, ...remainingTextData } = textData;

		// Group uploaded files by fieldname
		const filesByField: Record<string, Express.Multer.File[]> = {};

		for (const file of files) {
			const key = file?.fieldname;
			if (!key) continue;

			if (!filesByField[key]) filesByField[key] = [];
			filesByField[key].push(file);
		}

		const uploadedOtherImages: any[] = [];

		if (Array.isArray(textData.otherImages)) {
			for (let i = 0; i < textData.otherImages.length; i++) {
				const group = textData.otherImages[i];
				const groupField = `otherImages_${i}`;
				const groupFiles = filesByField[groupField] || [];

				// 🚀 Upload to R2 in parallel
				const uploadedUrls = await Promise.all(
					groupFiles.map(async (file) => {
						try {
							const key = `products/variants/${group?.colorName?.toLowerCase()}`;

							const url = await uploadToR2(file, key);

							await deleteFileAsync(file.path);

							return url;
						} catch (err) {
							console.error(`R2 upload failed for ${file.originalname}`, err);
							return null;
						}
					})
				).then((urls) => urls.filter(Boolean));

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
					qty: group?.qty,
					images: finalGroupImages,
				});
			}
		}
		// delete from r2 when replacing old images with new images

		if (deletableImgUrls && deletableImgUrls?.length > 0) {
			for (const url of deletableImgUrls) {
				await deleteFromR2(url);
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
