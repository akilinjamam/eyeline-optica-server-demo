import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { lenseService } from "./lenses.service";

const createLenseController = catchAsync(async (req, res) => {
	const result = await lenseService.createLenseService(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Lense created successfully",
		data: result,
	});
});
const getAllLenseController = catchAsync(async (req, res) => {
	const result = await lenseService.getAllLenseService(req.query);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "all Lense found successfully",
		data: result,
	});
});

export const lenseController = {
	createLenseController,
	getAllLenseController,
};
