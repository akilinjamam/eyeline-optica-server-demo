"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentHistoryController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const paymentHistory_service_1 = require("./paymentHistory.service");
const getPaymentHistoryController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await paymentHistory_service_1.paymentHistoryService.getPaymentHistoryService(req.params.cus_id, req?.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "payment history found successfully",
        data: result,
    });
});
exports.paymentHistoryController = {
    getPaymentHistoryController,
};
//# sourceMappingURL=paymentHistory.controller.js.map