"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const sales_service_1 = require("./sales.service");
const createSalesController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sales_service_1.salesService.createSalesService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Sales created successfully",
        data: result,
    });
});
const getAllSalesController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sales_service_1.salesService.getAllSalessService(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "all sales found successfully",
        data: result,
    });
});
exports.salesController = {
    createSalesController,
    getAllSalesController,
};
//# sourceMappingURL=sales.controller.js.map