import { Request, Response, NextFunction } from "express";
import { deleteFile } from "../utils/deleteFile";
import { IProduct } from "../../modules/products/products.types";
import { deleteFromR2, uploadToR2 } from "../config/r2.service";

const combineImagesWithTextData =
	(serviceType: string) => async (req: Request, res: Response, next: NextFunction) => {
		const files = req.files as Express.Multer.File[];

		try {
			const textData: IProduct = JSON.parse(req.body.data);

			const { images: oldImageUrls, deletableImgUrls, ...remainingTextData } = textData;
			// console.log(textData);
			// return;

			// Upload new images to cloudflare R2
			const newImageUrls: string[] = [];
			for (const file of files) {
				const key = `${serviceType}/${remainingTextData?.slug || Date.now()}`;
				const url = await uploadToR2(file, key);
				newImageUrls.push(url);
				deleteFile(file.path); // remove from local storage after upload
			}

			let finalImages = newImageUrls;

			if (req.method === "PUT") {
				const oldImages: string[] = oldImageUrls || [];
				finalImages = [...oldImages, ...newImageUrls];
			}

			// delete from r2 when replacing old images with new images

			if (deletableImgUrls && deletableImgUrls?.length > 0) {
				for (const url of deletableImgUrls) {
					await deleteFromR2(url);
				}
			}

			req.body = { ...remainingTextData, images: finalImages };
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

export default combineImagesWithTextData;
