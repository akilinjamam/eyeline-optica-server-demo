"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const paymentRouter = express_1.default.Router();
paymentRouter.post("/ssl-init", payment_controller_1.paymentController.createPaymentController);
paymentRouter.post("/payment-success", payment_controller_1.paymentController.paymentSuccessController);
paymentRouter.post("/payment-fail", payment_controller_1.paymentController.paymentFailController);
paymentRouter.post("/payment-cancelled", payment_controller_1.paymentController.paymentCancelledController);
exports.default = paymentRouter;
//# sourceMappingURL=payment.route.js.map