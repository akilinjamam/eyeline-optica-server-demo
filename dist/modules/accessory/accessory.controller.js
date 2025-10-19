"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessoryController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const accessory_service_1 = require("./accessory.service");
const createAccessoryController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await accessory_service_1.accessoryService.createAccessoryService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Accessory created successfully",
        data: result,
    });
});
const getAllAccessoryController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await accessory_service_1.accessoryService.getAllAccessoryService(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Accessories found successfully",
        data: result,
    });
});
const getSingleAccessoryController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await accessory_service_1.accessoryService.getSingleAccessoryService(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Accessory found successfully",
        data: result,
    });
});
const updateAccessoryController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await accessory_service_1.accessoryService.updateAccessoryService(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Accessory updated successfully",
        data: result,
    });
});
const deleteAccessoryController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await accessory_service_1.accessoryService.deleteAccessoryService(req.body.ids);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Accessories deleted  successfully",
        data: result,
    });
});
exports.accessoryController = {
    createAccessoryController,
    getAllAccessoryController,
    getSingleAccessoryController,
    updateAccessoryController,
    deleteAccessoryController,
};
//# sourceMappingURL=accessory.controller.js.map