"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const sales_validation_1 = require("./sales.validation");
const sales_controller_1 = require("./sales.controller");
const salesRouter = express_1.default.Router();
salesRouter.post("/create-sales", (0, validateRequest_1.default)(sales_validation_1.salesItemSchema), sales_controller_1.salesController.createSalesController);
salesRouter.get("/", sales_controller_1.salesController.getAllSalesController);
exports.default = salesRouter;
//# sourceMappingURL=sales.route.js.map