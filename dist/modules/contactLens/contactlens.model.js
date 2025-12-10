"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ContactLensSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    type: {
        type: String,
        enum: ["daily disposable", "weekly", "monthly", "monthly (colored)", "toric", "multifocal"],
        default: "daily disposable",
    },
    material: { type: String, required: true },
    waterContent: { type: String, required: true }, // e.g. "38%"
    diameter: { type: Number, required: true },
    baseCurve: { type: Number, required: true },
    powerRange: { type: String, required: true },
    features: [{ type: String }],
    uvProtection: { type: Boolean, default: false },
    purchasePrice: { type: Number, required: true },
    salesPrice: { type: Number, required: true },
    stock: { type: Boolean, default: true },
    sold: { type: Number, default: 0 },
    quantity: { type: Number, required: true },
    offer: { type: Number, min: 0, max: 100, default: 0 },
    barcode: { type: String, default: "not-added" },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    description: { type: String },
    images: [{ type: String }],
    imageIds: [{ type: String }],
    powerType: { type: String, required: true, enum: ["with power", "without power"] },
    weeklyDeals: { type: Boolean, default: false },
    badge: { type: String, default: "premium" },
}, { timestamps: true });
const ContactLens = mongoose_1.default.model("ContactLens", ContactLensSchema);
exports.default = ContactLens;
//# sourceMappingURL=contactlens.model.js.map