import express from "express";
import { upload } from "../../app/middleware/multer";
import combineImagesWithTextData from "../../app/middleware/combineImagesWithData";
import validateRequest from "../../app/middleware/validateRequest";
import { contactLensSchema } from "./contactlens.validation";
import { contactLensController } from "./contactlens.controller";
const contactlensRouter = express.Router();

contactlensRouter.post(
	"/create-contact-lens",
	upload.array("images", 10),
	combineImagesWithTextData,
	validateRequest(contactLensSchema),
	contactLensController.createContactLensController
);

contactlensRouter.get("/", contactLensController.getAllContactLenseController);
contactlensRouter.put(
	"/update-contact-lens/:id",
	upload.array("images", 10),
	combineImagesWithTextData,
	contactLensController.updateContactLensController
);
contactlensRouter.delete("/delete-contact-lens", contactLensController.deleteContactLensController);

export default contactlensRouter;
