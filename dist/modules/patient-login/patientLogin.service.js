"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientLoginService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const patient_model_1 = require("../patient/patient.model");
const jwt_1 = require("../../app/utils/jwt");
const createPatientLogin = async (phoneNumber) => {
    const findNumber = await patient_model_1.Patient.findOne({ phone: phoneNumber });
    if (!findNumber)
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "please book a slot first. then login");
    const findPatient = await patient_model_1.Patient.findOne({ phone: phoneNumber }).sort({ createdAt: -1 });
    const tokenData = {
        patientId: findPatient?._id,
        name: findPatient?.name,
        phone: findPatient?.phone,
        age: findPatient?.age,
        address: findPatient?.address,
        slotId: findPatient?.slotId,
    };
    const token = (0, jwt_1.generateToken)(tokenData);
    return `Beared ${token}`;
};
exports.patientLoginService = {
    createPatientLogin,
};
//# sourceMappingURL=patientLogin.service.js.map