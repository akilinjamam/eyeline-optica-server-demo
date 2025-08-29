/* eslint-disable no-unused-vars */
import { StatusCodes } from "http-status-codes";
import cloudinary from "../../app/config/cloudinary";
import catchAsync from "../../app/utils/catchAsync";
import { deleteFile } from "../../app/utils/deleteFile";
import sendResponse from "../../app/utils/sendResponse";
import { productService } from "./products.service";

const createProductController = catchAsync(async (req, res) => {
	const { images, ...remaining } = req.body;
	const files = req.files as Express.Multer.File[];
	const imageUrls: string[] = [];

	for (const file of files) {
		const result = await cloudinary.uploader.upload(file.path, {
			folder: "products",
		});
		imageUrls.push(result.secure_url);

		// Delete local temp file
		deleteFile(file.path);
	}

	const result = productService.createProductService({ images: imageUrls, ...remaining });

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "product created successfully",
		data: result,
	});
});

export const productController = {
	createProductController,
};
