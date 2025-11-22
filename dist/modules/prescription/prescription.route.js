"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const prescription_validation_1 = require("./prescription.validation");
const prescription_controller_1 = require("./prescription.controller");
const auth_1 = require("../../app/middleware/auth");
const prescriptionRouter = express_1.default.Router();
prescriptionRouter.post("/create-prescription", (0, validateRequest_1.default)(prescription_validation_1.PrescriptionSchema), prescription_controller_1.prescriptionController.createPrescriptionController);
prescriptionRouter.get("/", prescription_controller_1.prescriptionController.getAllPrescriptionController);
prescriptionRouter.get("/:id", auth_1.protect, prescription_controller_1.prescriptionController.getSinglePrescriptionController);
prescriptionRouter.get("/get-single-prescription/:id", auth_1.protect, prescription_controller_1.prescriptionController.getSinglePrescriptionController);
prescriptionRouter.put("/update-prescription/:id", prescription_controller_1.prescriptionController.updatePrescriptionController);
prescriptionRouter.delete("/delete-prescription", prescription_controller_1.prescriptionController.deletePrescriptionController);
exports.default = prescriptionRouter;
//# sourceMappingURL=prescription.route.js.map