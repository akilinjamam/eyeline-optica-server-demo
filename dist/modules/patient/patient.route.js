"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_controller_1 = require("./patient.controller");
const patientRoute = express_1.default.Router();
patientRoute.get("/get-patient/:doctorId", patient_controller_1.patientForDoctorController.getPatientForDcotorController);
exports.default = patientRoute;
//# sourceMappingURL=patient.route.js.map