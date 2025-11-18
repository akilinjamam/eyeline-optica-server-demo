"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentAppointment_controller_1 = require("./paymentAppointment.controller");
const paymentAppointmentRouter = express_1.default.Router();
paymentAppointmentRouter.post("/ssl-init-appointment", paymentAppointment_controller_1.paymentAppointmentController.createPaymentAppointmentController);
paymentAppointmentRouter.post("/payment-success-appointment", paymentAppointment_controller_1.paymentAppointmentController.successPaymentAppointmentController);
paymentAppointmentRouter.post("/payment-fail-appointment", paymentAppointment_controller_1.paymentAppointmentController.failedPaymentAppointmentController);
paymentAppointmentRouter.post("/payment-cancelled-appointment", paymentAppointment_controller_1.paymentAppointmentController.cancelledPaymentAppointmentController);
exports.default = paymentAppointmentRouter;
//# sourceMappingURL=paymentAppointment.route.js.map