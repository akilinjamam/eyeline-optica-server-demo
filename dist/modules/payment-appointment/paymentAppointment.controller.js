"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentAppointmentController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const paymentAppointment_service_1 = require("./paymentAppointment.service");
const createPaymentAppointmentController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await paymentAppointment_service_1.paymentAppointmentService.createPaymentAppontment(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "appointment created successfully",
        success: true,
        data: result,
    });
});
const successPaymentAppointmentController = (0, catchAsync_1.default)(async (req, res) => {
    const { slotId, patientAge, patientName, patientPhoneNumber, patientAddress, doctorId } = req.query;
    const data = {
        name: patientName,
        phone: patientPhoneNumber,
        age: patientAge,
        address: patientAddress,
        doctorId,
        slotId,
    };
    const result = await paymentAppointment_service_1.paymentAppointmentService.successPaymentAppointment(data);
    if (result === "success")
        res.redirect("https://eyelineoptica.com/payment-success");
});
const failedPaymentAppointmentController = (0, catchAsync_1.default)(async (req, res) => {
    res.redirect("https://eyelineoptica.com/payment-failed");
});
const cancelledPaymentAppointmentController = (0, catchAsync_1.default)(async (req, res) => {
    res.redirect("https://eyelineoptica.com/payment-cancelled");
});
exports.paymentAppointmentController = {
    createPaymentAppointmentController,
    successPaymentAppointmentController,
    failedPaymentAppointmentController,
    cancelledPaymentAppointmentController,
};
//# sourceMappingURL=paymentAppointment.controller.js.map