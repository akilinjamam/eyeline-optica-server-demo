import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { BannerService } from "./banner.service";

const createBannerController = catchAsync(async (req, res) => {
	const result = await BannerService.createBannerService(req.body);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Banner created successfully",
		data: result,
	});
});

const getAllBannerController = catchAsync(async (req, res) => {
	const result = await BannerService.getAllBannerService(req.query);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "all Banners found successfully",
		data: result,
	});
});

const getSingleBannerController = catchAsync(async (req, res) => {
	const result = await BannerService.getSingleBannerService(req.params.id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "single Banner found successfully",
		data: result,
	});
});

const updateBannerController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await BannerService.updateBannerService(req.body, id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Banner updated successfully",
		data: result,
	});
});
const deleteBannerController = catchAsync(async (req, res) => {
	const { ids } = req.body;
	const result = await BannerService.deleteBannerService(ids as string[]);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Banner deleted successfully",
		data: result,
	});
});

export const BannerController = {
	createBannerController,
	getAllBannerController,
	getSingleBannerController,
	updateBannerController,
	deleteBannerController,
};
