import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { blogImgService } from "./blogImg.service";
import cloudinary from "../../app/config/cloudinary";

const createBlogImgController = catchAsync(async (req, res) => {
	const file = req.file as Express.Multer.File;
	const imageDatas = await cloudinary.uploader.upload(file.path, {
		folder: "blog-image",
	});

	const imageUrl = imageDatas?.secure_url;

	const result = await blogImgService.createBlogImgService(imageUrl);

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
