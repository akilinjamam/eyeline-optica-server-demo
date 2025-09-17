import express from "express";
import { registrationController } from "./registration.controller";
import { protect } from "../../app/middleware/auth";

const registrationRouter = express.Router();

registrationRouter.post(
	"/create-registration",
	registrationController.createRegistrationController
);

registrationRouter.post("/create-login", registrationController.createLoginController);

registrationRouter.get(
	"/get-all-users",
	protect,
	registrationController.getUserRegistrationController
);

export default registrationRouter;
