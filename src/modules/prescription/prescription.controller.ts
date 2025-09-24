import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { prescriptionService } from "./prescription.service";

const createPrescriptionController = catchAsync(async (req, res) => {
	const result = await prescriptionService.createPrescriptionService(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		message: "prescription created successfully",
		success: true,
		data: result,
	});
});
const getAllPrescriptionController = catchAsync(async (req, res) => {
	const result = await prescriptionService.getAllPrescription(req.query);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		message: "prescription created successfully",
		success: true,
		data: result.data,
		meta: result.meta,
	});
});

const getSinglePrescriptionController = catchAsync(async (req, res) => {
	const result = await prescriptionService.getSinglePrescription(req.params.id as string);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		message: "prescription created successfully",
		success: true,
		data: result,
	});
});

const updatePrescriptionController = catchAsync(async (req, res) => {
	const result = await prescriptionService.updatePrescription(req.body, req.params.id as string);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		message: "prescription updated successfully",
		success: true,
		data: result,
	});
});
const deletePrescriptionController = catchAsync(async (req, res) => {
	const result = await prescriptionService.deletePrescription(req.body.ids as string[]);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		message: "prescription deleted successfully",
		success: true,
		data: result,
	});
});

export const prescriptionController = {
	createPrescriptionController,
	getAllPrescriptionController,
	getSinglePrescriptionController,
	updatePrescriptionController,
	deletePrescriptionController,
};
