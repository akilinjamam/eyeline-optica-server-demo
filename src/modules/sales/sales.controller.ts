import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";

import sendResponse from "../../app/utils/sendResponse";
import { salesService } from "./sales.service";

const createSalesController = catchAsync(async (req, res) => {
	const result = await salesService.createSalesService(req.body);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Sales created successfully",
		data: result,
	});
});

const getAllSalesController = catchAsync(async (req, res) => {
	const result = await salesService.getAllSalessService(req.query);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "all sales found successfully",
		data: result,
	});
});

export const salesController = {
	createSalesController,
	getAllSalesController,
};
