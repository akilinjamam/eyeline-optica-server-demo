import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { paymentService } from "./payment.service";

const createPaymentController = catchAsync(async (req, res) => {
	const result = await paymentService.createPaymentService(req.body);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "ssl added",
		data: result,
	});
});

const paymentSuccessController = catchAsync(async (req, res) => {
	const result = await paymentService.paymentSuccessService(req.query.salesId as string);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "payment success done",
		data: result,
	});
});

export const paymentController = {
	createPaymentController,
	paymentSuccessController,
};
