"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../app/middleware/multer");
const products_controller_1 = require("./products.controller");
const products_validation_1 = require("./products.validation");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const combineImagesWithData_1 = __importDefault(require("../../app/middleware/combineImagesWithData"));
const productrouter = express_1.default.Router();
productrouter.post("/create-product", multer_1.upload.array("images", 10), combineImagesWithData_1.default, (0, validateRequest_1.default)(products_validation_1.productSchema), products_controller_1.productController.createProductController);
productrouter.get("/", products_controller_1.productController.getAllProductController);
productrouter.get("/get-single-product/:id", products_controller_1.productController.getSingleProductController);
productrouter.put("/update-product/:id", multer_1.upload.array("images", 10), combineImagesWithData_1.default, products_controller_1.productController.updateProductController);
productrouter.delete("/delete-product", products_controller_1.productController.deleteProductController);
exports.default = productrouter;
//# sourceMappingURL=products.route.js.map