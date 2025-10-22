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

export const searchfiltercontroller = {
	getSearchItemsController,
};
