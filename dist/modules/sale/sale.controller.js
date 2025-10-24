"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salescontroller = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const sale_service_1 = require("./sale.service");
const getSalescontroller = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sale_service_1.salesService.getSaleService(req?.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "sales found successfully",
        data: result,
    });
});
const getCustomercontroller = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sale_service_1.salesService.getCustomerService(req?.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "customers found successfully",
        data: result,
    });
});
const updateStatuscontroller = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sale_service_1.salesService.updateStatusService(req?.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "sales and payment history updated successfully",
        data: result,
    });
});
exports.salescontroller = {
    getSalescontroller,
    getCustomercontroller,
    updateStatuscontroller,
};
//# sourceMappingURL=sale.controller.js.map