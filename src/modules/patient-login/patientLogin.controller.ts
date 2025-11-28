import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { patientLoginService } from "./patientLogin.service";

const createPatientController = catchAsync(async (req, res) => {
	const { phoneNumber } = req.body;
	const result = await patientLoginService.createPatientLogin(phoneNumber);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "patient-token created successfully",
		data: result,
	});
});

export const pateintController = {
	createPatientController,
};
