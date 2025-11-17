"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../app/middleware/multer");
const combineImagesWithData_1 = __importDefault(require("../../app/middleware/combineImagesWithData"));
const doctor_controller_1 = require("./doctor.controller");
const doctorRouter = express_1.default.Router();
doctorRouter.post("/create-doctor", multer_1.upload.array("images", 10), combineImagesWithData_1.default, doctor_controller_1.doctorController.createDoctorsController);
doctorRouter.get("/", doctor_controller_1.doctorController.getAllDoctorsController);
doctorRouter.get("/:email", doctor_controller_1.doctorController.getSingleDoctorController);
doctorRouter.put("/update-doctor/:id", multer_1.upload.array("images", 10), combineImagesWithData_1.default, doctor_controller_1.doctorController.updateDoctorsController);
exports.default = doctorRouter;
//# sourceMappingURL=doctor.route.js.map