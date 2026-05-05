import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { promoService } from "./promocode.service";

const createPromoController = catchAsync(async (req, res) => {
	const result = await promoService.createPromoService(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		message: "promo code created successfully",
		success: true,
		data: result,
	});
});

const getPromoController = catchAsync(async (req, res) => {
	const result = await promoService.getPromoService(req.query);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		message: "promo code created successfully",
		success: true,
		meta: result.meta,
		data: result.data,
	});
});

const updatePromoController = catchAsync(async (req, res) => {
	const result = await promoService.updatePromoService(req.body, req.params.id as string);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		message: "promo code updated successfully",
		success: true,
		data: result,
	});
});

const deletePromoController = catchAsync(async (req, res) => {
	const result = await promoService.deletePromoService(req.body.ids as string[]);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		message: "promo code deleted successfully",
		success: true,
		data: result,
	});
});

export const promoController = {
	createPromoController,
	getPromoController,
	updatePromoController,
	deletePromoController,
};
