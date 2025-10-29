"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../app/middleware/QueryBuilder"));
const AppError_1 = require("../../app/errors/AppError");
const category_model_1 = require("./category.model");
const createCategoryService = async (payload) => {
    const result = await category_model_1.Category.create(payload);
    return result;
};
const getAllCategoryService = async (query) => {
    const result = new QueryBuilder_1.default(category_model_1.Category.find({}), query)
        .search(["categoryType", "category"])
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
const getSingleCategoryService = async (id) => {
    const result = await category_model_1.Category.findOne({ _id: id });
    return result;
};
const updateCategoryService = async (payload, id) => {
    const result = await category_model_1.Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
    }
    return result;
};
const deleteCategoryService = async (ids) => {
    if (!ids || !ids.length) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No IDs provided");
    }
    const result = await category_model_1.Category.deleteMany({ _id: { $in: ids } });
    return result;
};
exports.CategoryService = {
    createCategoryService,
    getAllCategoryService,
    getSingleCategoryService,
    updateCategoryService,
    deleteCategoryService,
};
//# sourceMappingURL=category.service.js.map