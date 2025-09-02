import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";

import sendResponse from "../../app/utils/sendResponse";
import { productService } from "./products.service";

const createProductController = catchAsync(async (req, res) => {
	const result = await productService.createProductService(req.body);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "product created successfully",
		data: result,
	});
});

const getAllProductController = catchAsync(async (req, res) => {
	const result = await productService.getAllProductsService(req.query);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "all products found successfully",
		data: result,
	});
});

export const productController = {
	createProductController,
	getAllProductController,
};
