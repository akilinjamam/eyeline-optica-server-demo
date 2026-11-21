import { Request, Response } from "express";
import { CustomerServices } from "./customer.service";
import sendResponse from "../../../app/utils/sendResponse";
import catchAsync from "../../../app/utils/catchAsync";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
	const result = await CustomerServices.createCustomer(req.body);
	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "Customer created successfully",
		data: result,
	});
});

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
	const result = await CustomerServices.getAllCustomers(req.query);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Customers retrieved successfully",
		data: result,
	});
});

const getSingleCustomer = catchAsync(async (req: Request, res: Response) => {
	const result = await CustomerServices.getSingleCustomer(req.params.id as string);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Customer retrieved successfully",
		data: result,
	});
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
	const result = await CustomerServices.updateCustomer(req.params.id as string, req.body);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Customer updated successfully",
		data: result,
	});
});

const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
	const result = await CustomerServices.deleteCustomer(req.params.id as string);
	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "Customer deleted successfully",
		data: result,
	});
});

export const CustomerControllers = {
	createCustomer,
	getAllCustomers,
	getSingleCustomer,
	updateCustomer,
	deleteCustomer,
};
