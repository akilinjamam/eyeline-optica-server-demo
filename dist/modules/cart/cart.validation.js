"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidationSchema = exports.cartItemSchema = void 0;
const zod_1 = require("zod");
// 🎯 Each item in the sale/cart
exports.cartItemSchema = zod_1.z.object({
    type: zod_1.z.enum(["frame", "frame_with_lens", "lens", "contact_lens", "accessory"]),
    productId: zod_1.z.string().optional(),
    lensId: zod_1.z.string().optional(),
    contactLensId: zod_1.z.string().optional(),
    accessoryId: zod_1.z.string().optional(),
    quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
    unitPrice: zod_1.z.number().min(0, "Unit price cannot be negative"),
    subtotal: zod_1.z.number().min(0, "Subtotal cannot be negative"),
});
// 🧾 Main sale object validation
exports.cartValidationSchema = zod_1.z.object({
    customerName: zod_1.z.string().min(1),
    phoneNumber: zod_1.z.string().min(1),
    email: zod_1.z.string().min(1),
    address: zod_1.z.string().min(1),
    items: zod_1.z
        .array(exports.cartItemSchema)
        .min(1)
        .refine((items) => items.every((item) => {
        switch (item.type) {
            case "frame":
                return !!item.productId;
            case "frame_with_lens":
                return !!item.productId && !!item.lensId;
            case "lens":
                return !!item.lensId;
            case "contact_lens":
                return !!item.contactLensId;
            case "accessory":
                return !!item.accessoryId;
            default:
                return false;
        }
    }), {
        message: "Each item must include the correct references for its type",
    }),
    totalAmount: zod_1.z.number().min(0),
    deliveryFee: zod_1.z.number().min(0),
});
//# sourceMappingURL=cart.validation.js.map