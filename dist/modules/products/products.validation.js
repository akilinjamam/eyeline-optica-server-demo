"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
// validations/product.validation.ts
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    images: zod_1.z.array(zod_1.z.string().url()).optional(),
    type: zod_1.z.string(),
    materialsCategory: zod_1.z.string(),
    frameCategory: zod_1.z.string(),
    sizeCategory: zod_1.z.string(),
    shapeCategory: zod_1.z.string(),
    biologyCategory: zod_1.z.string(),
    color: zod_1.z.string(),
    purchase: zod_1.z.number().nonnegative(),
    salesPrice: zod_1.z.number().nonnegative(),
    discount: zod_1.z.number().optional().default(0),
    quantity: zod_1.z.number().int().nonnegative(),
    sold: zod_1.z.number().int().nonnegative().optional(),
    features: zod_1.z.array(zod_1.z.string()).optional(),
    brand: zod_1.z.string(),
    barcode: zod_1.z.string(),
    badge: zod_1.z.string().optional(),
    description: zod_1.z.string(),
    weeklyDeals: zod_1.z.boolean(),
    frameMeasurements: zod_1.z.string().optional(),
    frameDetails: zod_1.z.string().optional(),
    prescriptionDetails: zod_1.z.string().optional(),
    reviews: zod_1.z.array(zod_1.z.any()).optional(),
    stock: zod_1.z.boolean().default(true),
    frameWidth: zod_1.z.string().default("Not-added"),
    bridge: zod_1.z.string().default("Not-added"),
    lensWidth: zod_1.z.string().default("Not-added"),
    lensHeight: zod_1.z.string().default("Not-added"),
    templeLength: zod_1.z.string().default("Not-added"),
    size: zod_1.z.string().default("Not-added"),
    weight: zod_1.z.string().default("Not-added"),
    pdRange: zod_1.z.string().default("Not-added"),
    prescriptionRange: zod_1.z.string().default("Not-added"),
    availableAsProBi: zod_1.z.boolean().default(false),
    availableAsReader: zod_1.z.boolean().default(false),
    rating: zod_1.z.number().min(0).max(5).default(0),
    otherImages: zod_1.z
        .array(zod_1.z.object({
        colorName: zod_1.z.string().optional().default("Black"),
        fromColor: zod_1.z.string().optional().default("#000000"),
        toColor: zod_1.z.string().optional().default("#000000"),
        images: zod_1.z.array(zod_1.z.string().url()).optional(),
    }))
        .optional(),
});
//# sourceMappingURL=products.validation.js.map