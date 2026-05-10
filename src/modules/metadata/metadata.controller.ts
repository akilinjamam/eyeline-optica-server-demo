import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import { metaService } from "./metadata.service";
import sendResponse from "../../app/utils/sendResponse";

const createMetaController = catchAsync(async (req, res) => {
	const result = await metaService.createMetaService(req.body);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "meta created successfully",
		data: result,
	});
});

const getAllMetaController = catchAsync(async (req, res) => {
	const result = await metaService.getAllMetaService(req.query);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "all meta found successfully",
		data: result,
	});
});

const getSingleMetaController = catchAsync(async (req, res) => {
	const result = await metaService.getSingleMetaService(req.params.id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "single meta found successfully",
		data: result,
	});
});

const updateMetaController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await metaService.updateMetaService(req.body, id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "meta updated successfully",
		data: result,
	});
});
const deleteMetaController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await metaService.deleteMetaService(id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "meta deleted successfully",
		data: result,
	});
});

export const MetaController = {
	createMetaController,
	getAllMetaController,
	getSingleMetaController,
	updateMetaController,
	deleteMetaController,
};
