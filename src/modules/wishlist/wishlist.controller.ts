import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { wwishListService } from "./wishlist.service";

const createWishlistController = catchAsync(async (req, res) => {
	const result = await wwishListService.createWishListService(req?.body);
	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "successfully done",
		data: result,
	});
});
const getWishlistAccordingToTypeController = catchAsync(async (req, res) => {
	const result = await wwishListService.getAllWishlistAccordingToType(req?.query?.type as string);
	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "wishlist successfully found",
		data: result,
	});
});

export const wishlistController = {
	createWishlistController,
	getWishlistAccordingToTypeController,
};
