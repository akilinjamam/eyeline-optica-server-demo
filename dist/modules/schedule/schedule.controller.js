"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemduleController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const schedule_service_1 = require("./schedule.service");
const createScheduleWithSlotController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await schedule_service_1.scheduleService.createScheduleWithSlotService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Schedule created successfully",
        data: result,
    });
});
const getAllSlotController = (0, catchAsync_1.default)(async (req, res) => {
    const { doctorId } = req.params;
    const result = await schedule_service_1.scheduleService.getAllSlot(doctorId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Slot found successfully",
        data: result,
    });
});
const getSingleSlotController = (0, catchAsync_1.default)(async (req, res) => {
    const { slotId } = req.params;
    const result = await schedule_service_1.scheduleService.getSingleSlot(slotId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Single Slot found successfully",
        data: result,
    });
});
exports.schemduleController = {
    createScheduleWithSlotController,
    getAllSlotController,
    getSingleSlotController,
};
//# sourceMappingURL=schedule.controller.js.map