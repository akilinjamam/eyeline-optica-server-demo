import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { cartService } from "./cart.service";

const createCartController = catchAsync(async (req, res) => {
	const result = await cartService.createCartService(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Cart created successfully",
		data: result,
	});
});
const getCartController = catchAsync(async (req, res) => {
	const result = await cartService.getCartService(req.params.id as string);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "all Lense found successfully",
		data: result,
	});
});

export const cartController = {
	createCartController,
	getCartController,
};
