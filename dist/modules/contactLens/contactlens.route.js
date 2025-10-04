"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../app/middleware/multer");
const combineImagesWithData_1 = __importDefault(require("../../app/middleware/combineImagesWithData"));
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const contactlens_validation_1 = require("./contactlens.validation");
const contactlens_controller_1 = require("./contactlens.controller");
const contactlensRouter = express_1.default.Router();
contactlensRouter.post("/create-contact-lens", multer_1.upload.array("images", 10), combineImagesWithData_1.default, (0, validateRequest_1.default)(contactlens_validation_1.contactLensSchema), contactlens_controller_1.contactLensController.createContactLensController);
contactlensRouter.get("/", contactlens_controller_1.contactLensController.getAllContactLenseController);
contactlensRouter.put("/update-contact-lens/:id", multer_1.upload.array("images", 10), combineImagesWithData_1.default, contactlens_controller_1.contactLensController.updateContactLensController);
contactlensRouter.delete("/delete-contact-lens", contactlens_controller_1.contactLensController.deleteContactLensController);
exports.default = contactlensRouter;
//# sourceMappingURL=contactlens.route.js.map