import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { customerLoginService } from "./customerLogin.service";

const getUserLoginController = catchAsync(async (req, res) => {
	const result = await customerLoginService.createCustomerLogin(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "login successfully done",
		data: result,
	});
});

export const customerLoginController = {
    getUserLoginController
}