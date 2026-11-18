import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { blogImgService } from "./blogImg.service";
import { uploadToR2 } from "../../app/config/r2.service";
import { deleteFile } from "../../app/utils/deleteFile";

const createBlogImgController = catchAsync(async (req, res) => {
	const file = req.file as Express.Multer.File;
	const key = `blog-images/${Date.now()}`;
	const url = await uploadToR2(file, key);
	deleteFile(file.path);

	const result = await blogImgService.createBlogImgService(url);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Blog Image created successfully",
		data: result,
	});
});

export const blogImgController = {
	createBlogImgController,
};
