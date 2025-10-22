import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { paymentHistoryService } from "./paymentHistory.service";

const getPaymentHistoryController = catchAsync(async (req, res) => {
	const result = await paymentHistoryService.getPaymentHistoryService(
		req.params.cus_id as string,
		req?.query
	);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "payment history found successfully",
		data: result,
	});
});

const getSinglePaymentHistoryController = catchAsync(async (req, res) => {
	const result = await paymentHistoryService.getSinglePaymentHistoryService(
		req.params.id as string
	);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "single payment history found successfully",
		data: result,
	});
});

export const paymentHistoryController = {
	getPaymentHistoryController,
	getSinglePaymentHistoryController,
};
