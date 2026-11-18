import express from "express";
import { upload } from "../../app/middleware/multer";
import combineImagesWithTextData from "../../app/middleware/combineImagesWithDataR2";
import { doctorController } from "./doctor.controller";

const doctorRouter = express.Router();

doctorRouter.post(
	"/create-doctor",
	upload.array("images", 10),
	combineImagesWithTextData("doctor"),
	doctorController.createDoctorsController
);

doctorRouter.get("/", doctorController.getAllDoctorsController);
doctorRouter.get("/:email", doctorController.getSingleDoctorController);
doctorRouter.put(
	"/update-doctor/:id",
	upload.array("images", 10),
	combineImagesWithTextData("doctor"),
	doctorController.updateDoctorsController
);

export default doctorRouter;
