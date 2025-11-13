"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const banner_service_1 = require("./banner.service");
const createBannerController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await banner_service_1.BannerService.createBannerService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Banner created successfully",
        data: result,
    });
});
const getAllBannerController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await banner_service_1.BannerService.getAllBannerService(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "all Banners found successfully",
        data: result,
    });
});
const getSingleBannerController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await banner_service_1.BannerService.getSingleBannerService(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "single Banner found successfully",
        data: result,
    });
});
const updateBannerController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await banner_service_1.BannerService.updateBannerService(req.body, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Banner updated successfully",
        data: result,
    });
});
const deleteBannerController = (0, catchAsync_1.default)(async (req, res) => {
    const { ids } = req.body;
    const result = await banner_service_1.BannerService.deleteBannerService(ids);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Banner deleted successfully",
        data: result,
    });
});
exports.BannerController = {
    createBannerController,
    getAllBannerController,
    getSingleBannerController,
    updateBannerController,
    deleteBannerController,
};
//# sourceMappingURL=banner.controller.js.map