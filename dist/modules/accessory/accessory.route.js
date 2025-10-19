"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../app/middleware/multer");
const combineImagesWithData_1 = __importDefault(require("../../app/middleware/combineImagesWithData"));
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const accessory_validation_1 = require("./accessory.validation");
const accessory_controller_1 = require("./accessory.controller");
const accessoryRouter = express_1.default.Router();
accessoryRouter.post("/create-accessory", multer_1.upload.array("images", 10), combineImagesWithData_1.default, (0, validateRequest_1.default)(accessory_validation_1.accessorySchema), accessory_controller_1.accessoryController.createAccessoryController);
accessoryRouter.get("/get-accessories", accessory_controller_1.accessoryController.getAllAccessoryController);
accessoryRouter.put("/update-accessory/:id", multer_1.upload.array("images", 10), combineImagesWithData_1.default, accessory_controller_1.accessoryController.updateAccessoryController);
accessoryRouter.delete("/delete-accessory", accessory_controller_1.accessoryController.deleteAccessoryController);
accessoryRouter.get("/get-accessory-by-id/:id", accessory_controller_1.accessoryController.getSingleAccessoryController);
exports.default = accessoryRouter;
//# sourceMappingURL=accessory.route.js.map