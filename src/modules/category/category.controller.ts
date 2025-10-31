import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { CategoryService } from "./category.service";

const createCategoryController = catchAsync(async (req, res) => {
	const result = await CategoryService.createCategoryService(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "all category created successfully",
		data: result,
	});
});

const getAllContactLenseController = catchAsync(async (req, res) => {
	const result = await CategoryService.getAllCategoryService(req.query);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "all category found successfully",
		data: result,
	});
});
const getSingleCategoryController = catchAsync(async (req, res) => {
	const result = await CategoryService.getSingleCategoryService(req.params.id as string);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "category id found successfully",
		data: result,
	});
});

const updateCategoryController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await CategoryService.updateCategoryService(req.body, id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Category updated successfully",
		data: result,
	});
});
const deleteCategoryController = catchAsync(async (req, res) => {
	const { ids } = req.body;
	const result = await CategoryService.deleteCategoryService(ids as string[]);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Contact Lens deleted successfully",
		data: result,
	});
});

export const CategoryController = {
	createCategoryController,
	getAllContactLenseController,
	getSingleCategoryController,
	updateCategoryController,
	deleteCategoryController,
};
