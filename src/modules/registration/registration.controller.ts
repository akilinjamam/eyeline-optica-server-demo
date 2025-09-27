import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { registrationService } from "./registration.service";
import { AuthRequest } from "../../app/middleware/auth";

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

const getUserRegistrationController = catchAsync(async (req, res) => {
	const result = await registrationService.getUserRegistrationService();

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "User found successfully",
		data: result,
	});
});
const getCheckRoleOfUserController = catchAsync(async (req: AuthRequest, res) => {
	const value = req.user;
	const result = await registrationService.getCheckRoleOfUser(value?.email, value.role);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "User Role Checked successfully",
		data: result,
	});
});
const updateUserRegistrationController = catchAsync(async (req: AuthRequest, res) => {
	const { id } = req.params;
	const result = await registrationService.updateUserService(id as string, req.body);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "User updated successfully",
		data: result,
	});
});

const deleteUserRegistrationController = catchAsync(async (req, res) => {
	const { ids } = req.body;
	const result = await registrationService.deleteUsersService(ids);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Users deleted successfully",
		data: result,
	});
});

export const registrationController = {
	createRegistrationController,
	createLoginController,
	getUserRegistrationController,
	getCheckRoleOfUserController,
	deleteUserRegistrationController,
	updateUserRegistrationController,
};
