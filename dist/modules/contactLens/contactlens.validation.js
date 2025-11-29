"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactLensSchema = exports.createContactLensSchema = exports.contactLensSchema = void 0;
const zod_1 = require("zod");
exports.contactLensSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    brand: zod_1.z.string().min(1, "Brand is required"),
    color: zod_1.z.string().min(1, "Color is required"),
    type: zod_1.z
        .enum(["daily disposable", "monthly", "monthly (colored)", "weekly", "toric", "multifocal"])
        .or(zod_1.z.string().min(1)), // extendable
    powerType: zod_1.z.enum(["with power", "without power"]).or(zod_1.z.string().min(1)),
    material: zod_1.z.string().min(1, "Material is required"),
    waterContent: zod_1.z.string(),
    diameter: zod_1.z.number(), // realistic range
    baseCurve: zod_1.z.number(),
    powerRange: zod_1.z.string(),
    uvProtection: zod_1.z.boolean().default(false),
    purchasePrice: zod_1.z.number().min(0, "Purchase price must be >= 0"),
    salesPrice: zod_1.z.number().min(0, "Sales price must be >= 0"),
    stock: zod_1.z.boolean().default(true),
    quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
    sold: zod_1.z.number().default(0),
    offer: zod_1.z.number().min(0).max(100).optional().default(0),
    rating: zod_1.z.number().min(0).max(5).default(0),
    barcode: zod_1.z.string().optional().default("not-added"),
    features: zod_1.z.array(zod_1.z.string()).optional(),
    description: zod_1.z.string().optional(),
    images: zod_1.z.array(zod_1.z.string().url("Must be a valid URL")).optional().default([]),
    weeklyDeals: zod_1.z.boolean().default(false),
    badge: zod_1.z.string().default("premium"),
});
// For creating new ContactLens
exports.createContactLensSchema = exports.contactLensSchema;
// For updating (all fields optional)
exports.updateContactLensSchema = exports.contactLensSchema.partial();
//# sourceMappingURL=contactlens.validation.js.map