"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const cart_validation_1 = require("./cart.validation");
const cart_controller_1 = require("./cart.controller");
const cartRouter = express_1.default.Router();
cartRouter.post("/create-cart", (0, validateRequest_1.default)(cart_validation_1.cartValidationSchema), cart_controller_1.cartController.createCartController);
cartRouter.get("/get-cart-by-id/:phoneId", cart_controller_1.cartController.getCartController);
exports.default = cartRouter;
//# sourceMappingURL=cart.route.js.map