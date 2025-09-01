import { StatusCodes } from "http-status-codes";
import cloudinary from "../../app/config/cloudinary";
import catchAsync from "../../app/utils/catchAsync";
import { deleteFile } from "../../app/utils/deleteFile";
import sendResponse from "../../app/utils/sendResponse";
import { productService } from "./products.service";

const createProductController = catchAsync(async (req, res) => {
	req.body = JSON.parse(req.body.data);

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

	const result = await productService.createProductService({ images: imageUrls, ...req.body });

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
