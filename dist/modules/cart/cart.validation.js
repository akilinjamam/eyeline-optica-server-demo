"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidationSchema = exports.cartItemSchema = void 0;
const zod_1 = require("zod");
// 👁️ Prescription schema
const prescriptionSchema = zod_1.z.object({
    sphere: zod_1.z.string().optional(),
    cylinder: zod_1.z.string().optional(),
    axis: zod_1.z.string().optional(),
});
// 🛒 Each item in the cart
exports.cartItemSchema = zod_1.z.object({
    type: zod_1.z.enum([
        "frame",
        "frame_with_lens",
        "lens",
        "contact_lens",
        "contact_lens_with_accessory",
        "accessory",
    ]),
    submitType: zod_1.z.string().optional(),
    productId: zod_1.z.string().optional(),
    lensId: zod_1.z.string().optional(),
    contactLensId: zod_1.z.string().optional(),
    accessoryId: zod_1.z.string().optional(),
    prescriptionImg: zod_1.z.array(zod_1.z.string()).optional().default([]),
    pd: zod_1.z.number().optional().default(0),
    rightEye: prescriptionSchema.optional(),
    leftEye: prescriptionSchema.optional(),
    quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
    unitPrice: zod_1.z.number().min(0, "Unit price cannot be negative"),
    subtotal: zod_1.z.number().min(0, "Subtotal cannot be negative"),
});
// 🧾 Main cart validation
exports.cartValidationSchema = zod_1.z.object({
    customerName: zod_1.z.string().min(1, "Customer name is required"),
    phoneNumber: zod_1.z.string().min(1, "Phone number is required"),
    email: zod_1.z.string().optional().default(""),
    address: zod_1.z.string().optional().default(""),
    items: zod_1.z
        .array(exports.cartItemSchema)
        .min(1, "Cart must contain at least one item")
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
            case "contact_lens_with_accessory":
                return !!item.contactLensId && !!item.accessoryId;
            case "accessory":
                return !!item.accessoryId;
            default:
                return false;
        }
    }), {
        message: "Each item must include the correct references for its type",
    }),
    totalAmount: zod_1.z.number().min(0, "Total amount cannot be negative"),
    deliveryFee: zod_1.z.number().min(0, "Delivery fee cannot be negative"),
});
//# sourceMappingURL=cart.validation.js.map