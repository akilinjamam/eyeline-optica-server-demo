"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerLoginController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const customerLogin_service_1 = require("./customerLogin.service");
const getUserLoginController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await customerLogin_service_1.customerLoginService.createCustomerLogin(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "login successfully done",
        data: result,
    });
});
exports.customerLoginController = {
    getUserLoginController
};
//# sourceMappingURL=customerLogin.controller.js.map