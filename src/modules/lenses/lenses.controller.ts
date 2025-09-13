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

const updateLensController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await lenseService.updateLensService(req.body, id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "lens updated successfully",
		data: result,
	});
});
const deleteLensController = catchAsync(async (req, res) => {
	const { ids } = req.body;
	const result = await lenseService.deleteLensService(ids as string[]);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "lens deleted successfully",
		data: result,
	});
});

export const lenseController = {
	createLenseController,
	getAllLenseController,
	updateLensController,
	deleteLensController,
};
