"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const registration_service_1 = require("./registration.service");
const createRegistrationController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await registration_service_1.registrationService.createRegistrationService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Registration done successfully",
        data: result,
    });
});
const createLoginController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await registration_service_1.registrationService.createLoginService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Login done successfully",
        data: result,
    });
});
const getUserRegistrationController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await registration_service_1.registrationService.getUserRegistrationService();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User found successfully",
        data: result,
    });
});
const getCheckRoleOfUserController = (0, catchAsync_1.default)(async (req, res) => {
    const value = req.user;
    const result = await registration_service_1.registrationService.getCheckRoleOfUser(value?.email, value.role);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User Role Checked successfully",
        data: result,
    });
});
const updateUserRegistrationController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await registration_service_1.registrationService.updateUserService(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User updated successfully",
        data: result,
    });
});
const deleteUserRegistrationController = (0, catchAsync_1.default)(async (req, res) => {
    const { ids } = req.body;
    const result = await registration_service_1.registrationService.deleteUsersService(ids);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Users deleted successfully",
        data: result,
    });
});
exports.registrationController = {
    createRegistrationController,
    createLoginController,
    getUserRegistrationController,
    getCheckRoleOfUserController,
    deleteUserRegistrationController,
    updateUserRegistrationController,
};
//# sourceMappingURL=registration.controller.js.map