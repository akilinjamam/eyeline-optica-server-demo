import express from "express";
import validateRequest from "../../app/middleware/validateRequest";

import { cartValidationSchema } from "./cart.validation";
import { cartController } from "./cart.controller";

const cartRouter = express.Router();

cartRouter.post(
	"/create-cart",
	validateRequest(cartValidationSchema),
	cartController.createCartController
);

cartRouter.get("/", cartController.getCartController);

export default cartRouter;
