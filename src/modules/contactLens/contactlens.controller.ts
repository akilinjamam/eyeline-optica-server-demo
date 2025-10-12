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
const getSingleContactLenseController = catchAsync(async (req, res) => {
	const result = await contactLensService.getSingleContactLensService(req.params.id as string);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "contact Lense id found successfully",
		data: result,
	});
});

const updateContactLensController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await contactLensService.updateContactLensService(req.body, id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Contact Lens updated successfully",
		data: result,
	});
});
const deleteContactLensController = catchAsync(async (req, res) => {
	const { ids } = req.body;
	const result = await contactLensService.deleteContactLensService(ids as string[]);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Contact Lens deleted successfully",
		data: result,
	});
});

export const contactLensController = {
	createContactLensController,
	getAllContactLenseController,
	getSingleContactLenseController,
	updateContactLensController,
	deleteContactLensController,
};
