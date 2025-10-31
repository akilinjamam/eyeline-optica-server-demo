"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../app/middleware/auth");
const blog_controller_1 = require("./blog.controller");
const multer_1 = require("../../app/middleware/multer");
const combineImagesWithData_1 = __importDefault(require("../../app/middleware/combineImagesWithData"));
const blogRouter = express_1.default.Router();
blogRouter.post("/create-blog", auth_1.protect, multer_1.upload.array("images", 10), combineImagesWithData_1.default, blog_controller_1.BlogController.createBlogController);
blogRouter.get("/", auth_1.protect, blog_controller_1.BlogController.getAllBlogController);
blogRouter.put("/update-blog/:id", auth_1.protect, multer_1.upload.array("images", 10), combineImagesWithData_1.default, blog_controller_1.BlogController.updateBlogController);
blogRouter.delete("/delete-blog", auth_1.protect, blog_controller_1.BlogController.deleteBlogController);
blogRouter.get("/get-blog-by-id/:id", auth_1.protect, blog_controller_1.BlogController.getSingleBlogController);
exports.default = blogRouter;
//# sourceMappingURL=blog.route.js.map