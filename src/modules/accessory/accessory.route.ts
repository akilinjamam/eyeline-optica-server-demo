import express from "express";
import { upload } from "../../app/middleware/multer";
import combineImagesWithTextData from "../../app/middleware/combineImagesWithData";
import validateRequest from "../../app/middleware/validateRequest";
import { accessorySchema } from "./accessory.validation";
import { accessoryController } from "./accessory.controller";

const accessoryRouter = express.Router();

accessoryRouter.post(
	"/create-accessory",
	upload.array("images", 10),
	combineImagesWithTextData,
	validateRequest(accessorySchema),
	accessoryController.createAccessoryController
);

accessoryRouter.get("/get-accessories", accessoryController.getAllAccessoryController);
accessoryRouter.put(
	"/update-accessory/:id",
	upload.array("images", 10),
	combineImagesWithTextData,
	accessoryController.updateAccessoryController
);
accessoryRouter.delete("/delete-accessory", accessoryController.deleteAccessoryController);
accessoryRouter.get("/get-accessory-by-id/:id", accessoryController.getSingleAccessoryController);

export default accessoryRouter;
