import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { contactLensService } from "./contactlens.service";

const createContactLensController = catchAsync(async (req, res) => {
	const result = await contactLensService.createContactLensService(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "all Contact Lense created successfully",
		data: result,
	});
});

const getAllContactLenseController = catchAsync(async (req, res) => {
	const result = await contactLensService.getAllContactLenseService(req.query);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "all contact Lense found successfully",
		data: result,
	});
});

export const contactLensController = {
	createContactLensController,
	getAllContactLenseController,
};
