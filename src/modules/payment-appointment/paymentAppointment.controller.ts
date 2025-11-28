import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { paymentAppointmentService } from "./paymentAppointment.service";

const createPaymentAppointmentController = catchAsync(async (req, res) => {
	const result = await paymentAppointmentService.createPaymentAppontment(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		message: "appointment created successfully",
		success: true,
		data: result,
	});
});
const successPaymentAppointmentController = catchAsync(async (req, res) => {
	const { slotId, patientAge, patientName, patientPhoneNumber, patientAddress, doctorId } =
		req.query;
	const data = {
		name: patientName,
		phone: patientPhoneNumber,
		age: patientAge,
		address: patientAddress,
		doctorId,
		slotId,
	};
	const result = await paymentAppointmentService.successPaymentAppointment(data);

	res.redirect(`https://eyelineoptica.com/payment-success?patientId=${result?.patientId}`);
});

const failedPaymentAppointmentController = catchAsync(async (req, res) => {
	res.redirect("https://eyelineoptica.com/payment-failed");
});
const cancelledPaymentAppointmentController = catchAsync(async (req, res) => {
	res.redirect("https://eyelineoptica.com/payment-cancelled");
});

export const paymentAppointmentController = {
	createPaymentAppointmentController,
	successPaymentAppointmentController,
	failedPaymentAppointmentController,
	cancelledPaymentAppointmentController,
};
