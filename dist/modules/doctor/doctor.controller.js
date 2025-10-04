"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const doctor_service_1 = require("./doctor.service");
const createDoctorsController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await doctor_service_1.doctorServices.createDoctorService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Doctor Profile created Successfully",
        data: result,
    });
});
const getSingleDoctorController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await doctor_service_1.doctorServices.getSingleDoctorService(req.params.email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Doctor found successfully",
        data: result,
    });
});
const getAllDoctorsController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await doctor_service_1.doctorServices.getAllDoctorService(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "All Doctors found successfully",
        data: result,
    });
});
const updateDoctorsController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await doctor_service_1.doctorServices.updateDoctorService(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Doctor updated successfully",
        data: result,
    });
});
exports.doctorController = {
    createDoctorsController,
    getSingleDoctorController,
    getAllDoctorsController,
    updateDoctorsController,
};
//# sourceMappingURL=doctor.controller.js.map