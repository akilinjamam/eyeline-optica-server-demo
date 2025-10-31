import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { BlogService } from "./blog.service";

const createBlogController = catchAsync(async (req, res) => {
	const result = await BlogService.createBlogService(req.body);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "all Blog created successfully",
		data: result,
	});
});

const getAllBlogController = catchAsync(async (req, res) => {
	const result = await BlogService.getAllBlogService(req.query);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "all Blog found successfully",
		data: result,
	});
});
const getSingleBlogController = catchAsync(async (req, res) => {
	const result = await BlogService.getSingleBlogService(req.params.id as string);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Blog id found successfully",
		data: result,
	});
});

const updateBlogController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await BlogService.updateBlogService(req.body, id as string);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Blog updated successfully",
		data: result,
	});
});
const deleteBlogController = catchAsync(async (req, res) => {
	const { ids } = req.body;
	const result = await BlogService.deleteBlogService(ids as string[]);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "blog deleted successfully",
		data: result,
	});
});

export const BlogController = {
	createBlogController,
	getAllBlogController,
	getSingleBlogController,
	updateBlogController,
	deleteBlogController,
};
