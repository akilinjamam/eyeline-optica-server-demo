"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientForDoctorController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const patient_service_1 = require("./patient.service");
const getPatientForDcotorController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await patient_service_1.patientForDoctorService.getPatientForDoctorService(req?.params?.doctorId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "patient Data found successfuly",
        data: result,
    });
});
exports.patientForDoctorController = {
    getPatientForDcotorController,
};
//# sourceMappingURL=patient.controller.js.map