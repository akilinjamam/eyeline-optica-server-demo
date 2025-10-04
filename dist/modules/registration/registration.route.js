"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registration_controller_1 = require("./registration.controller");
const auth_1 = require("../../app/middleware/auth");
const registrationRouter = express_1.default.Router();
registrationRouter.post("/create-registration", registration_controller_1.registrationController.createRegistrationController);
registrationRouter.post("/create-login", registration_controller_1.registrationController.createLoginController);
registrationRouter.get("/get-all-users", auth_1.protect, registration_controller_1.registrationController.getUserRegistrationController);
registrationRouter.get("/check-user-role", auth_1.protect, registration_controller_1.registrationController.getCheckRoleOfUserController);
registrationRouter.patch("/update-user/:id", registration_controller_1.registrationController.updateUserRegistrationController);
registrationRouter.delete("/delete-users", registration_controller_1.registrationController.deleteUserRegistrationController);
exports.default = registrationRouter;
//# sourceMappingURL=registration.route.js.map