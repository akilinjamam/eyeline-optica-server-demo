"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientLogin_controller_1 = require("./patientLogin.controller");
const appointmentLogin = express_1.default.Router();
appointmentLogin.post("/create-patient-login", patientLogin_controller_1.pateintController.createPatientController);
exports.default = appointmentLogin;
//# sourceMappingURL=patientLogin.route.js.map