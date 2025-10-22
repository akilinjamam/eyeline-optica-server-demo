import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { salesService } from "./sale.service";

const getSalescontroller = catchAsync(async (req, res) => {
	const result = await salesService.getSaleService(req?.query);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "sales found successfully",
		data: result,
	});
});
const getCustomercontroller = catchAsync(async (req, res) => {
	const result = await salesService.getCustomerService(req?.query);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "customers found successfully",
		data: result,
	});
});

export const salescontroller = {
	getSalescontroller,
	getCustomercontroller,
};
