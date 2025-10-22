"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentHistory_controller_1 = require("./paymentHistory.controller");
const paymentHistoryRouter = express_1.default.Router();
paymentHistoryRouter.get("/get-payment-history/:cus_id", paymentHistory_controller_1.paymentHistoryController.getPaymentHistoryController);
exports.default = paymentHistoryRouter;
//# sourceMappingURL=paymentHistory.route.js.map