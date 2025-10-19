import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { accessoryService } from "./accessory.service";

const createAccessoryController = catchAsync(async (req, res) => {
	const result = await accessoryService.createAccessoryService(req.body);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Accessory created successfully",
		data: result,
	});
});
const getAllAccessoryController = catchAsync(async (req, res) => {
	const result = await accessoryService.getAllAccessoryService(req.query);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Accessories found successfully",
		data: result,
	});
});
const getSingleAccessoryController = catchAsync(async (req, res) => {
	const result = await accessoryService.getSingleAccessoryService(req.params.id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Accessory found successfully",
		data: result,
	});
});
const updateAccessoryController = catchAsync(async (req, res) => {
	const result = await accessoryService.updateAccessoryService(req.params.id as string, req.body);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Accessory updated successfully",
		data: result,
	});
});

const deleteAccessoryController = catchAsync(async (req, res) => {
	const result = await accessoryService.deleteAccessoryService(req.body.ids as string[]);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Accessories deleted  successfully",
		data: result,
	});
});

export const accessoryController = {
	createAccessoryController,
	getAllAccessoryController,
	getSingleAccessoryController,
	updateAccessoryController,
	deleteAccessoryController,
};
