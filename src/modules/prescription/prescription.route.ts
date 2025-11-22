import express from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { PrescriptionSchema } from "./prescription.validation";
import { prescriptionController } from "./prescription.controller";
import { protect } from "../../app/middleware/auth";

const prescriptionRouter = express.Router();

prescriptionRouter.post(
	"/create-prescription",
	validateRequest(PrescriptionSchema),
	prescriptionController.createPrescriptionController
);

prescriptionRouter.get("/", prescriptionController.getAllPrescriptionController);
prescriptionRouter.get("/:id", protect, prescriptionController.getSinglePrescriptionController);
prescriptionRouter.get(
	"/get-single-prescription/:id",
	protect,
	prescriptionController.getSinglePrescriptionController
);
prescriptionRouter.put(
	"/update-prescription/:id",
	prescriptionController.updatePrescriptionController
);
prescriptionRouter.delete(
	"/delete-prescription",
	prescriptionController.deletePrescriptionController
);

export default prescriptionRouter;
