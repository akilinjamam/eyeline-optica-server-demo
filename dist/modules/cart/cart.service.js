"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const cart_model_1 = require("./cart.model");
const jwt_1 = require("../../app/utils/jwt");
const createCartService = async (payload) => {
    const result = await cart_model_1.Cart.create(payload);
    if (!result) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "failed to create Cart");
    }
    const findCart = await cart_model_1.Cart.findOne({ _id: result._id });
    const tokenData = {
        id: findCart?._id,
        email: findCart?.email,
        name: findCart?.customerName,
    };
    const token = (0, jwt_1.generateToken)(tokenData);
    const resultWithtoken = { token: `Bearer ${token}` };
    return resultWithtoken;
};
const getCartService = async (phoneNumber) => {
    try {
        const carts = await cart_model_1.Cart.find({ phoneNumber })
            .populate("items.productId") // populate frame
            .populate("items.lensId") // populate lens
            .populate("items.contactLensId"); // populate contact lens
        // .populate("items.accessoryId"); // populate accessory
        return carts;
    }
    catch (error) {
        throw new Error("Failed to fetch cart: " + error.message);
    }
};
exports.cartService = {
    createCartService,
    getCartService,
};
//# sourceMappingURL=cart.service.js.map