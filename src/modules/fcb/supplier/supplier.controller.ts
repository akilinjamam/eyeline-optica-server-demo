import { Request, Response } from "express";
import { SupplierServices } from "./supplier.service";
import catchAsync from "../../../app/utils/catchAsync";
import sendResponse from "../../../app/utils/sendResponse";

const createSupplier = catchAsync(async (req: Request, res: Response) => {
	const result = await SupplierServices.createSupplier(req.body);
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Supplier created successfully",
		data: result,
	});
});

const getAllSuppliers = catchAsync(async (req: Request, res: Response) => {
	const result = await SupplierServices.getAllSuppliers(req.query);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Suppliers retrieved successfully",
		data: result,
	});
});

const getSingleSupplier = catchAsync(async (req: Request, res: Response) => {
	const result = await SupplierServices.getSingleSupplier(req.params.id as string);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Supplier retrieved successfully",
		data: result,
	});
});

const updateSupplier = catchAsync(async (req: Request, res: Response) => {
	const result = await SupplierServices.updateSupplier(req.params.id as string, req.body);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Supplier updated successfully",
		data: result,
	});
});

const deleteSupplier = catchAsync(async (req: Request, res: Response) => {
	const result = await SupplierServices.deleteSupplier(req.params.id as string);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Supplier deleted successfully",
		data: result,
	});
});

export const SupplierControllers = {
	createSupplier,
	getAllSuppliers,
	getSingleSupplier,
	updateSupplier,
	deleteSupplier,
};
