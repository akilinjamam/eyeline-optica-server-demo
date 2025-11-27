import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { patientForDoctorService } from "./patient.service";

const getPatientForDcotorController = catchAsync(async (req, res) => {
	const result = await patientForDoctorService.getPatientForDoctorService(
		req?.params?.doctorId as string
	);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "patient Data found successfuly",
		data: result,
	});
});

export const patientForDoctorController = {
	getPatientForDcotorController,
};
