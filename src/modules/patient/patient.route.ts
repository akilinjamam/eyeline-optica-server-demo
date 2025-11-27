import express from "express";
import { patientForDoctorController } from "./patient.controller";

const patientRoute = express.Router();

patientRoute.get(
	"/get-patient/:doctorId",
	patientForDoctorController.getPatientForDcotorController
);

export default patientRoute;
