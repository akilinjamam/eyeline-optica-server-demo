"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const blog_service_1 = require("./blog.service");
const createBlogController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await blog_service_1.BlogService.createBlogService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "all Blog created successfully",
        data: result,
    });
});
const getAllBlogController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await blog_service_1.BlogService.getAllBlogService(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "all Blog found successfully",
        data: result,
    });
});
const getSingleBlogController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await blog_service_1.BlogService.getSingleBlogService(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Blog id found successfully",
        data: result,
    });
});
const updateBlogController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await blog_service_1.BlogService.updateBlogService(req.body, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Blog updated successfully",
        data: result,
    });
});
const deleteBlogController = (0, catchAsync_1.default)(async (req, res) => {
    const { ids } = req.body;
    const result = await blog_service_1.BlogService.deleteBlogService(ids);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "blog deleted successfully",
        data: result,
    });
});
exports.BlogController = {
    createBlogController,
    getAllBlogController,
    getSingleBlogController,
    updateBlogController,
    deleteBlogController,
};
//# sourceMappingURL=blog.controller.js.map