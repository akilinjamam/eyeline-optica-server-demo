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
	if (result === "success") {
		res.redirect("https://eyelineoptica.com/payment-success");
	}
});

const paymentFailController = catchAsync(async (req, res) => {
	const result = await paymentService.paymentFailService(req.query.salesId as string);
	if (result === "saleData deleted") {
		res.redirect("https://eyelineoptica.com/payment-failed");
	}
});
const paymentCancelledController = catchAsync(async (req, res) => {
	const result = await paymentService.paymentCancelledService(req.query.salesId as string);
	if (result === "saleData deleted") {
		res.redirect("https://eyelineoptica.com/payment-cancelled");
	}
});

export const paymentController = {
	createPaymentController,
	paymentSuccessController,
	paymentFailController,
	paymentCancelledController,
};
