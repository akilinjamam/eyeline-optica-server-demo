"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lenseController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const lenses_service_1 = require("./lenses.service");
const createLenseController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await lenses_service_1.lenseService.createLenseService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Lense created successfully",
        data: result,
    });
});
const getAllLenseController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await lenses_service_1.lenseService.getAllLenseService(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "all Lense found successfully",
        data: result,
    });
});
const updateLensController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await lenses_service_1.lenseService.updateLensService(req.body, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "lens updated successfully",
        data: result,
    });
});
const deleteLensController = (0, catchAsync_1.default)(async (req, res) => {
    const { ids } = req.body;
    const result = await lenses_service_1.lenseService.deleteLensService(ids);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "lens deleted successfully",
        data: result,
    });
});
exports.lenseController = {
    createLenseController,
    getAllLenseController,
    updateLensController,
    deleteLensController,
};
//# sourceMappingURL=lenses.controller.js.map