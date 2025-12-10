"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessorySchema = exports.accessoryItemSchema = void 0;
const zod_1 = require("zod");
// const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
// 	message: "Invalid customer ID",
// });
// ✅ Schema for individual accessory items
exports.accessoryItemSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    barcode: zod_1.z.string().default("not-added"),
    brand: zod_1.z.string().min(1, "Brand is required"),
    category: zod_1.z.string().min(1, "Category is required"),
    quantity: zod_1.z.number().min(0, "Quantity must be 0 or greater"),
    stock: zod_1.z.boolean().default(true),
    purchasePrice: zod_1.z.number().min(0, "Purchase price must be 0 or greater"),
    salesPrice: zod_1.z.number().min(0, "Sales price must be 0 or greater"),
    discount: zod_1.z.number().min(0, "Discount cannot be negative").default(0),
    sold: zod_1.z.number().min(0, "Sold count must be 0 or greater").default(0),
    measurement: zod_1.z.string().min(1, "Measurement is required"),
    description: zod_1.z.string().default("not-added"),
});
// ✅ Schema for main accessory
exports.accessorySchema = zod_1.z.object({
    images: zod_1.z.array(zod_1.z.string()).default([]),
    imageIds: zod_1.z.array(zod_1.z.string()).default([]),
    type: zod_1.z
        .enum([
        "With Solution",
        "With Bag",
        "With Kit",
        "With Solution + Kit",
        "With Solution + Bag",
        "With Kit + Bag",
        "With Solution + Bag + Kit",
        "others",
    ])
        .default("others"),
    weeklyDeals: zod_1.z.boolean().default(false),
    rating: zod_1.z.number().min(0).max(5).default(0),
    items: zod_1.z.array(exports.accessoryItemSchema).min(1, "At least one item is required"),
});
//# sourceMappingURL=accessory.validation.js.map