"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const payment_service_1 = require("./payment.service");
const createPaymentController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.paymentService.createPaymentService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "ssl added",
        data: result,
    });
});
const paymentSuccessController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.paymentService.paymentSuccessService(req.query.salesId);
    if (result === "success") {
        res.redirect("https://eyelineoptica.com/payment-success");
    }
});
const paymentFailController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.paymentService.paymentFailService(req.query.salesId);
    if (result === "saleData deleted") {
        res.redirect("https://eyelineoptica.com/payment-failed");
    }
});
const paymentCancelledController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.paymentService.paymentCancelledService(req.query.salesId);
    if (result === "saleData deleted") {
        res.redirect("https://eyelineoptica.com/payment-cancelled");
    }
});
exports.paymentController = {
    createPaymentController,
    paymentSuccessController,
    paymentFailController,
    paymentCancelledController,
};
//# sourceMappingURL=payment.controller.js.map