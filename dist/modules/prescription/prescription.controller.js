"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prescriptionController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const prescription_service_1 = require("./prescription.service");
const createPrescriptionController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await prescription_service_1.prescriptionService.createPrescriptionService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "prescription created successfully",
        success: true,
        data: result,
    });
});
const getAllPrescriptionController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await prescription_service_1.prescriptionService.getAllPrescription(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "prescription created successfully",
        success: true,
        data: result.data,
        meta: result.meta,
    });
});
const getSinglePrescriptionController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await prescription_service_1.prescriptionService.getSinglePrescription(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "prescription created successfully",
        success: true,
        data: result,
    });
});
const updatePrescriptionController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await prescription_service_1.prescriptionService.updatePrescription(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "prescription updated successfully",
        success: true,
        data: result,
    });
});
const deletePrescriptionController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await prescription_service_1.prescriptionService.deletePrescription(req.body.ids);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "prescription deleted successfully",
        success: true,
        data: result,
    });
});
exports.prescriptionController = {
    createPrescriptionController,
    getAllPrescriptionController,
    getSinglePrescriptionController,
    updatePrescriptionController,
    deletePrescriptionController,
};
//# sourceMappingURL=prescription.controller.js.map