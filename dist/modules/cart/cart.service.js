"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = exports.createCartService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../app/errors/AppError");
const cart_model_1 = require("./cart.model");
const jwt_1 = require("../../app/utils/jwt");
const customer_model_1 = __importDefault(require("../customer/customer.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createCartService = async (payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        let customerId = "";
        // 🔹 Step 1: Find or create customer
        const findCustomer = await customer_model_1.default.findOne({ phoneNumber: payload.phoneNumber }).session(session);
        if (!findCustomer) {
            const createNewCustomer = await customer_model_1.default.create([
                {
                    name: payload.customerName,
                    phoneNumber: payload.phoneNumber,
                    email: payload.email,
                    address: payload.address,
                },
            ], { session });
            customerId = createNewCustomer[0]?._id.toString();
        }
        else {
            customerId = findCustomer._id.toString();
        }
        // 🔹 Step 2: Create cart
        const newModifiedPayload = { ...payload, customerId };
        const result = await cart_model_1.Cart.create([newModifiedPayload], { session });
        if (!result || result.length === 0) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create Cart");
        }
        const findCart = await cart_model_1.Cart.findOne({ _id: result[0]?._id }).session(session);
        // 🔹 Step 3: Generate token
        const tokenData = {
            customerId: findCart?.customerId,
            id: findCart?._id,
            email: findCart?.email,
            name: findCart?.customerName,
            phoneNumber: findCart?.phoneNumber,
        };
        const token = (0, jwt_1.generateToken)(tokenData);
        await session.commitTransaction();
        session.endSession();
        return { token: `Bearer ${token}` };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Transaction failed:", error);
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create Cart transactionally");
    }
};
exports.createCartService = createCartService;
const createCartWithPrescriptionImg = async (payload) => {
    const { items, prescriptionImg, ...remaining } = payload;
    const newModifiedItems = [{ ...items[0], prescriptionImg: prescriptionImg }];
    const newPayload = { ...remaining, items: newModifiedItems };
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        let customerId = "";
        // 🔹 Step 1: Find or create customer
        const findCustomer = await customer_model_1.default.findOne({ phoneNumber: newPayload.phoneNumber }).session(session);
        if (!findCustomer) {
            const createNewCustomer = await customer_model_1.default.create([
                {
                    name: payload.customerName,
                    phoneNumber: payload.phoneNumber,
                    email: payload.email,
                    address: payload.address,
                },
            ], { session });
            customerId = createNewCustomer[0]?._id.toString();
        }
        else {
            customerId = findCustomer._id.toString();
        }
        // 🔹 Step 2: Create cart
        const newModifiedPayload = { ...newPayload, customerId };
        const result = await cart_model_1.Cart.create([newModifiedPayload], { session });
        if (!result || result.length === 0) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create Cart");
        }
        const findCart = await cart_model_1.Cart.findOne({ _id: result[0]?._id }).session(session);
        // 🔹 Step 3: Generate token
        const tokenData = {
            id: findCart?._id,
            email: findCart?.email,
            name: findCart?.customerName,
            phoneNumber: findCart?.phoneNumber,
        };
        const token = (0, jwt_1.generateToken)(tokenData);
        await session.commitTransaction();
        session.endSession();
        return { token: `Bearer ${token}` };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Transaction failed:", error);
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create Cart transactionally");
    }
};
const getCartService = async (phoneNumber) => {
    try {
        const carts = await cart_model_1.Cart.find({ phoneNumber })
            .populate("items.productId") // populate frame
            .populate("items.lensId") // populate lens
            .populate("items.contactLensId")
            .populate("items.accessoryId"); // populate accessory
        return carts;
    }
    catch (error) {
        throw new Error("Failed to fetch cart: " + error.message);
    }
};
const deleteCartService = async (id) => {
    const result = await cart_model_1.Cart.deleteOne({ _id: id });
    return result;
};
exports.cartService = {
    createCartService: exports.createCartService,
    createCartWithPrescriptionImg,
    getCartService,
    deleteCartService,
};
//# sourceMappingURL=cart.service.js.map