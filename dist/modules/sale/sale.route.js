"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../app/middleware/auth");
const sale_controller_1 = require("./sale.controller");
const salesRouter = express_1.default.Router();
salesRouter.get("/get-sales", auth_1.protect, sale_controller_1.salescontroller.getSalescontroller);
salesRouter.get("/get-customer", sale_controller_1.salescontroller.getCustomercontroller);
salesRouter.patch("/update-status/:id", sale_controller_1.salescontroller.updateStatuscontroller);
exports.default = salesRouter;
//# sourceMappingURL=sale.route.js.map