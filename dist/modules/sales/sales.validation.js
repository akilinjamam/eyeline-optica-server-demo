"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesItemSchema = void 0;
const zod_1 = require("zod");
exports.salesItemSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    category: zod_1.z.string().min(1, "Category is required"),
    brand: zod_1.z.string().optional(),
    barcode: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0, "Price must be positive"),
    purchasePrice: zod_1.z.number().min(0).optional(),
    quantity: zod_1.z.number().int().min(1, "Quantity must be at least 1"),
    discount: zod_1.z.number().min(0).max(100).optional(),
    total: zod_1.z.number().min(0).optional(),
    tax: zod_1.z.number().min(0).optional(),
    date: zod_1.z.date(),
    // Lens-specific
    lensType: zod_1.z.enum(["single vision", "bifocal", "progressive", "reading"]).optional(),
    material: zod_1.z.enum(["plastic", "polycarbonate", "high-index", "glass"]).optional(),
    coatings: zod_1.z.array(zod_1.z.string()).optional(),
    prescriptionRange: zod_1.z.string().optional(),
    index: zod_1.z.number().optional(),
    thickness: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
    diameter: zod_1.z.number().optional(),
    // Product-specific
    materialsCategory: zod_1.z.string().optional(),
    frameCategory: zod_1.z.string().optional(),
    sizeCategory: zod_1.z.string().optional(),
    shapeCategory: zod_1.z.string().optional(),
    biologyCategory: zod_1.z.string().optional(),
    features: zod_1.z.array(zod_1.z.string()).optional(),
    badge: zod_1.z.string().optional(),
});
//# sourceMappingURL=sales.validation.js.map