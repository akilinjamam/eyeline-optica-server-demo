import express from "express";

import { protect } from "../../app/middleware/auth";
import { upload } from "../../app/middleware/multer";
import { blogImgController } from "./blogImg.controller";
import validateRequest from "../../app/middleware/validateRequest";
import { blogImgSchema } from "./blogImg.validation";

const blogImgRouter = express.Router();

blogImgRouter.post(
	"/create-blog-image",
	protect,
	upload.single("image"),
	validateRequest(blogImgSchema),
	blogImgController.createBlogImgController
);

export default blogImgRouter;
