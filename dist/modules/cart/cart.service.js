"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const cart_model_1 = require("./cart.model");
const mongoose_1 = __importDefault(require("mongoose"));
const profile_model_1 = require("../profile/profile.model");
const createCartService = async (payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { username, phone, address, productId, lensId, quantity } = payload;
        // 1. Check or create Profile
        let profile = await profile_model_1.Profile.findOne({ phone }).session(session);
        if (!profile) {
            const createdProfiles = await profile_model_1.Profile.create([{ username, phone, address }], { session });
            profile = createdProfiles[0] ?? null;
        }
        if (!profile) {
            throw new Error("Failed to create or find profile.");
        }
        const result = await cart_model_1.Cart.create([
            {
                profileId: profile._id,
                username,
                phone,
                address,
                productId,
                lensId,
                quantity,
            },
        ], { session });
        await session.commitTransaction();
        return result;
    }
    catch (error) {
        await session.abortTransaction();
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message);
    }
    finally {
        await session.endSession();
    }
};
const getCartService = async () => {
    try {
        const carts = await cart_model_1.Cart.find()
            .populate("profileId", "username phone address") // fetch profile details
            .populate("productId", "name price") // fetch product details (change fields as needed)
            .populate("lensId", "type price") // fetch lens details (change fields as needed)
            .exec();
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