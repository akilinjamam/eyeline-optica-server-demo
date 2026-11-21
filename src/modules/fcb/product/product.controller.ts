import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import catchAsync from "../../../app/utils/catchAsync";
import sendResponse from "../../../app/utils/sendResponse";

const createProduct = catchAsync(async (req: Request, res: Response) => {
	const result = await ProductServices.createProduct(req.body);
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Product created successfully",
		data: result,
	});
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
	const result = await ProductServices.getAllProducts(req.query);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Products retrieved successfully",
		data: result,
	});
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
	const result = await ProductServices.getSingleProduct(req.params.id as string);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Product retrieved successfully",
		data: result,
	});
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
	const result = await ProductServices.updateProduct(req.params.id as string, req.body);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Product updated successfully",
		data: result,
	});
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
	const result = await ProductServices.deleteProduct(req.params.id as string);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Product deleted successfully",
		data: result,
	});
});

export const ProductControllers = {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
};
