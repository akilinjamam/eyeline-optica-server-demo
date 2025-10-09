"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lens = void 0;
const mongoose_1 = require("mongoose");
// 2. Create Mongoose schema
const LensSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    purchasePrice: { type: Number, required: true },
    salesPrice: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, default: "lens" },
    brand: { type: String },
    images: { type: [String], default: [] },
    lensType: {
        type: String,
        enum: ["single vision", "bifocal", "progressive", "reading", "zero power"],
        required: true,
    },
    material: {
        type: String,
        enum: ["plastic", "polycarbonate", "high-index", "glass"],
        required: true,
    },
    coatings: { type: [String], default: [] },
    prescriptionRange: { type: String },
    index: { type: Number },
    thickness: { type: String },
    color: { type: String },
    diameter: { type: Number },
    warranty: { type: String },
    deliveryTime: { type: String },
    offer: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5 },
}, {
    timestamps: true,
});
// 3. Export model
exports.Lens = (0, mongoose_1.model)("Lens", LensSchema);
//# sourceMappingURL=lenses.model.js.map