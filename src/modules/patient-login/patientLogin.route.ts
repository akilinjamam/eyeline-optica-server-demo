import express from "express";
import { pateintController } from "./patientLogin.controller";

const appointmentLogin = express.Router();

appointmentLogin.post("/create-patient-login", pateintController.createPatientController);

export default appointmentLogin;
