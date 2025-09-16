import express from "express";
import { registrationController } from "./registration.controller";

const registrationRouter = express.Router();

registrationRouter.post(
	"/create-registration",
	registrationController.createRegistrationController
);

registrationRouter.post("/create-login", registrationController.createLoginController);

export default registrationRouter;
