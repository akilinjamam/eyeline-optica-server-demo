"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const category_service_1 = require("./category.service");
const createCategoryController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.CategoryService.createCategoryService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "all category created successfully",
        data: result,
    });
});
const getAllContactLenseController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.CategoryService.getAllCategoryService(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "all category found successfully",
        data: result,
    });
});
const getSingleCategoryController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.CategoryService.getSingleCategoryService(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "category id found successfully",
        data: result,
    });
});
const updateCategoryController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await category_service_1.CategoryService.updateCategoryService(req.body, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Contact Lens updated successfully",
        data: result,
    });
});
const deleteCategoryController = (0, catchAsync_1.default)(async (req, res) => {
    const { ids } = req.body;
    const result = await category_service_1.CategoryService.deleteCategoryService(ids);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Contact Lens deleted successfully",
        data: result,
    });
});
exports.CategoryController = {
    createCategoryController,
    getAllContactLenseController,
    getSingleCategoryController,
    updateCategoryController,
    deleteCategoryController,
};
//# sourceMappingURL=category.controller.js.map