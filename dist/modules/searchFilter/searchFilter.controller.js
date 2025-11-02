"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchfiltercontroller = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const searchFilter_service_1 = require("./searchFilter.service");
const getSearchItemsController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await searchFilter_service_1.searchFilterService.getSearchItemService(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "items found successfully",
        data: result,
    });
});
const updateWeeklyDealsController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await searchFilter_service_1.searchFilterService.updateWeeklyDeals(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Speacial Deals updated successfully",
        data: result,
    });
});
const getWeeklyDealsController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await searchFilter_service_1.searchFilterService.getWeeklyDeals();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Speacial Deals found successfully",
        data: result,
    });
});
exports.searchfiltercontroller = {
    getSearchItemsController,
    updateWeeklyDealsController,
    getWeeklyDealsController,
};
//# sourceMappingURL=searchFilter.controller.js.map