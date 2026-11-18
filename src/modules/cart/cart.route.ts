import express from "express";
import validateRequest from "../../app/middleware/validateRequest";

import { cartValidationSchema } from "./cart.validation";
import { cartController } from "./cart.controller";
import { upload } from "../../app/middleware/multer";
import combineImagesWithTextData from "../../app/middleware/combineImagesWithDataR2";

const cartRouter = express.Router();

cartRouter.post(
	"/create-cart",
	validateRequest(cartValidationSchema),
	cartController.createCartController
);
cartRouter.post(
	"/create-cart-with-prescription",
	upload.array("prescriptionImg", 10),
	combineImagesWithTextData("prescription-img"),
	cartController.createCartWithPrescriptionImgController
);

cartRouter.get("/get-cart-by-id/:phoneId", cartController.getCartController);
cartRouter.delete("/delete-cart-by-id/:id", cartController.deleteCartController);

export default cartRouter;
