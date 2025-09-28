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

const getSingleProductController = catchAsync(async (req, res) => {
	const result = await productService.getSingleProductService(req.params.id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "single product found successfully",
		data: result,
	});
});

const updateProductController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await productService.updateProductService(req.body, id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "product updated successfully",
		data: result,
	});
});
const deleteProductController = catchAsync(async (req, res) => {
	const { ids } = req.body;
	const result = await productService.deleteProductService(ids as string[]);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "product deleted successfully",
		data: result,
	});
});

export const productController = {
	createProductController,
	getAllProductController,
	getSingleProductController,
	updateProductController,
	deleteProductController,
};
