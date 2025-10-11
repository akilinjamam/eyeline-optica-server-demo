"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerLogin_controller_1 = require("./customerLogin.controller");
const customerLoginRoute = express_1.default.Router();
customerLoginRoute.post('/create-customer-login', customerLogin_controller_1.customerLoginController.getUserLoginController);
exports.default = customerLoginRoute;
//# sourceMappingURL=customerLogin.route.js.map