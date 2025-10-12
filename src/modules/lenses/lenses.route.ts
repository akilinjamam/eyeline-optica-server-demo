import express from "express";
import { upload } from "../../app/middleware/multer";
import validateRequest from "../../app/middleware/validateRequest";
import combineImagesWithTextData from "../../app/middleware/combineImagesWithData";
import { lensValidationSchema } from "./lenses.validation";
import { lenseController } from "./lenses.controller";

const lenserouter = express.Router();

lenserouter.post(
	"/create-lens",
	upload.array("images", 10),
	combineImagesWithTextData,
	validateRequest(lensValidationSchema),
	lenseController.createLenseController
);

lenserouter.get("/", lenseController.getAllLenseController);
lenserouter.put(
	"/update-lens/:id",
	upload.array("images", 10),
	combineImagesWithTextData,
	lenseController.updateLensController
);
lenserouter.delete("/delete-lens", lenseController.deleteLensController);
lenserouter.get("/get-lens-by-id/:id", lenseController.getsingleLenseController);

export default lenserouter;
