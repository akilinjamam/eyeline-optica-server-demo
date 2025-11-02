import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { searchFilterService } from "./searchFilter.service";

const getSearchItemsController = catchAsync(async (req, res) => {
	const result = await searchFilterService.getSearchItemService(req.query);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "items found successfully",
		data: result,
	});
});
const updateWeeklyDealsController = catchAsync(async (req, res) => {
	const result = await searchFilterService.updateWeeklyDeals(req.body, req.params.id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Speacial Deals updated successfully",
		data: result,
	});
});
const getWeeklyDealsController = catchAsync(async (req, res) => {
	const result = await searchFilterService.getWeeklyDeals();

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Speacial Deals found successfully",
		data: result,
	});
});

export const searchfiltercontroller = {
	getSearchItemsController,
	updateWeeklyDealsController,
	getWeeklyDealsController,
};
