"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const products_service_1 = require("./products.service");
const createProductController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await products_service_1.productService.createProductService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "product created successfully",
        data: result,
    });
});
const getAllProductController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await products_service_1.productService.getAllProductsService(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "all products found successfully",
        data: result,
    });
});
const getSingleProductController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await products_service_1.productService.getSingleProductService(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "single product found successfully",
        data: result,
    });
});
const updateProductController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await products_service_1.productService.updateProductService(req.body, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "product updated successfully",
        data: result,
    });
});
const deleteProductController = (0, catchAsync_1.default)(async (req, res) => {
    const { ids } = req.body;
    const result = await products_service_1.productService.deleteProductService(ids);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "product deleted successfully",
        data: result,
    });
});
exports.productController = {
    createProductController,
    getAllProductController,
    getSingleProductController,
    updateProductController,
    deleteProductController,
};
//# sourceMappingURL=products.controller.js.map