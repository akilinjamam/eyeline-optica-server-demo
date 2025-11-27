"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientForDoctorService = void 0;
const patient_model_1 = require("./patient.model");
const getPatientForDoctorService = async (doctorId) => {
    const response = await patient_model_1.Patient.find({ doctorId }).populate("doctorId");
    return response;
};
exports.patientForDoctorService = {
    getPatientForDoctorService,
};
//# sourceMappingURL=patient.service.js.map