import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { registrationService } from "./registration.service";

const createRegistrationController = catchAsync(async (req, res) => {
	const result = await registrationService.createRegistrationService(req.body);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Registration done successfully",
		data: result,
	});
});
const createLoginController = catchAsync(async (req, res) => {
	const result = await registrationService.createLoginService(req.body);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Login done successfully",
		data: result,
	});
});

export const registrationController = {
	createRegistrationController,
	createLoginController,
};
