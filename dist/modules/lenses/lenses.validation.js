"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lensValidationSchema = void 0;
const zod_1 = require("zod");
exports.lensValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Lens name is required"),
    description: zod_1.z.string().optional(),
    purchasePrice: zod_1.z.number().min(0, "Price must be a positive number"),
    salesPrice: zod_1.z.number().min(0, "Price must be a positive number"),
    discount: zod_1.z.number().optional().default(0),
    barcode: zod_1.z.string().optional().default("not-added"),
    stock: zod_1.z.boolean().default(true),
    quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
    category: zod_1.z.string().default("lens"),
    brand: zod_1.z.string().optional(),
    images: zod_1.z.array(zod_1.z.string().url("Invalid image URL")).optional(),
    sold: zod_1.z.number().default(0),
    lensType: zod_1.z.enum(["single vision", "bifocal", "progressive", "reading", "zero power"]),
    material: zod_1.z.enum(["plastic", "polycarbonate", "high-index", "glass"]),
    coatings: zod_1.z.array(zod_1.z.string()).optional(),
    prescriptionRange: zod_1.z.string().optional(), // "+6.00 to -6.00"
    index: zod_1.z.number().optional(), // 1.5, 1.6, 1.67, etc.
    thickness: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
    diameter: zod_1.z.number().optional(),
    warranty: zod_1.z.string().optional(),
    deliveryTime: zod_1.z.string().optional(),
    offer: zod_1.z.number().min(0).max(100).default(0), // discount %
    rating: zod_1.z.number().min(0).max(5).optional(),
});
//# sourceMappingURL=lenses.validation.js.map