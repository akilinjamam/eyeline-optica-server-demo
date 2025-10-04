"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidationSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const objectIdSchema = zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});
exports.cartValidationSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    phone: zod_1.z.number().int("Phone must be an integer").positive("Phone number must be positive"),
    address: zod_1.z.string().min(1, "Address is required"),
    profileId: objectIdSchema.optional(),
    productId: objectIdSchema.optional(),
    lensId: objectIdSchema.optional(),
    quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
});
//# sourceMappingURL=cart.validation.js.map