"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../app/middleware/multer");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const combineImagesWithData_1 = __importDefault(require("../../app/middleware/combineImagesWithData"));
const lenses_validation_1 = require("./lenses.validation");
const lenses_controller_1 = require("./lenses.controller");
const lenserouter = express_1.default.Router();
lenserouter.post("/create-lens", multer_1.upload.array("images", 10), combineImagesWithData_1.default, (0, validateRequest_1.default)(lenses_validation_1.lensValidationSchema), lenses_controller_1.lenseController.createLenseController);
lenserouter.get("/", lenses_controller_1.lenseController.getAllLenseController);
lenserouter.put("/update-lens/:id", multer_1.upload.array("images", 10), combineImagesWithData_1.default, lenses_controller_1.lenseController.updateLensController);
lenserouter.delete("/delete-lens", lenses_controller_1.lenseController.deleteLensController);
lenserouter.get("/get-lens-by-id/:id", lenses_controller_1.lenseController.getsingleLenseController);
exports.default = lenserouter;
//# sourceMappingURL=lenses.route.js.map