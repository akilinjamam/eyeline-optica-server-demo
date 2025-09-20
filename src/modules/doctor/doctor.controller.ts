import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { doctorServices } from "./doctor.service";

const createDoctorsController = catchAsync(async (req, res) => {
	const { data } = req.body;
	const result = await doctorServices.createDoctorService(data);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Doctor Profile created Successfully",
		data: result,
	});
});

const getSingleDoctorController = catchAsync(async (req, res) => {
	const result = await doctorServices.getSingleDoctorService(req.params.id as string);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Doctor found successfully",
		data: result,
	});
});

const getAllDoctorsController = catchAsync(async (req, res) => {
	const result = await doctorServices.getAllDoctorService(req.query);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "All Doctors found successfully",
		data: result,
	});
});

const updateDoctorsController = catchAsync(async (req, res) => {
	const result = await doctorServices.updateDoctorService(req.params.id as string, req.body);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Doctor updated successfully",
		data: result,
	});
});

export const doctorController = {
	createDoctorsController,
	getSingleDoctorController,
	getAllDoctorsController,
	updateDoctorsController,
};
