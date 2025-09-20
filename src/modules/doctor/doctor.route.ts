import express from "express";
import { upload } from "../../app/middleware/multer";
import combineImagesWithTextData from "../../app/middleware/combineImagesWithData";
import { doctorController } from "./doctor.controller";
import { protect } from "../../app/middleware/auth";

const doctorRouter = express.Router();

doctorRouter.post(
	"/create-doctor",
	upload.array("10"),
	combineImagesWithTextData,
	doctorController.createDoctorsController
);

doctorRouter.get("/", protect, doctorController.getAllDoctorsController);
doctorRouter.get("/:id", doctorController.getSingleDoctorController);
doctorRouter.put("/update-doctor/:id", doctorController.updateDoctorsController);

export default doctorRouter;
