"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const AppError_1 = require("../../app/errors/AppError");
const blog_model_1 = require("./blog.model");
const createBlogService = async (payload) => {
    const result = await blog_model_1.Blog.create(payload);
    return result;
};
const getAllBlogService = async (query) => {
    const result = new QueryBuilder_1.default(blog_model_1.Blog.find({}), query)
        .search(["title", "category", "description"])
        .filter()
        .fields()
        .sort()
        .pagination();
    const meta = await result.countTotal();
    const data = await result.modelQuery;
    return {
        meta,
        data,
    };
};
const getSingleBlogService = async (id) => {
    const result = await blog_model_1.Blog.findOne({ _id: id });
    return result;
};
const updateBlogService = async (payload, id) => {
    const result = await blog_model_1.Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Blog not found");
    }
    return result;
};
const deleteBlogService = async (ids) => {
    if (!ids || !ids.length) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No IDs provided");
    }
    const result = await blog_model_1.Blog.deleteMany({ _id: { $in: ids } });
    return result;
};
exports.BlogService = {
    createBlogService,
    getAllBlogService,
    getSingleBlogService,
    updateBlogService,
    deleteBlogService,
};
//# sourceMappingURL=blog.service.js.map