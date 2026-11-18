import express from "express";
import { protect } from "../../app/middleware/auth";
import { BlogController } from "./blog.controller";
import { upload } from "../../app/middleware/multer";
import combineImagesWithTextData from "../../app/middleware/combineImagesWithDataR2";

const blogRouter = express.Router();

blogRouter.post(
	"/create-blog",
	protect,
	upload.array("images", 10),
	combineImagesWithTextData("blog"),
	BlogController.createBlogController
);
blogRouter.get("/", BlogController.getAllBlogController);
blogRouter.put(
	"/update-blog/:id",
	protect,
	upload.array("images", 10),
	combineImagesWithTextData("blog"),
	BlogController.updateBlogController
);
blogRouter.delete("/delete-blog", protect, BlogController.deleteBlogController);
blogRouter.get("/get-blog-by-id/:slug", BlogController.getSingleBlogController);

export default blogRouter;
