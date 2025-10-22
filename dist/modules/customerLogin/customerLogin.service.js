"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerLoginService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const cart_model_1 = require("../cart/cart.model");
const jwt_1 = require("../../app/utils/jwt");
const createCustomerLogin = async (payload) => {
    const findUserCart = await cart_model_1.Cart.findOne({ phoneNumber: payload.phoneNumber });
    if (!findUserCart)
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "user not found, please add product to cart");
    const tokenData = {
        id: findUserCart?._id,
        customerId: findUserCart?.customerId,
        email: findUserCart?.email,
        name: findUserCart?.customerName,
        phoneNumber: findUserCart?.phoneNumber,
    };
    const token = (0, jwt_1.generateToken)(tokenData);
    const resultWithtoken = { token: `Bearer ${token}` };
    return resultWithtoken;
};
exports.customerLoginService = {
    createCustomerLogin
};
//# sourceMappingURL=customerLogin.service.js.map