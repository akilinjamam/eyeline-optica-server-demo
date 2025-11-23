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
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    images: [{ type: String }],
    otherImages: [
        {
            colorName: { type: String, default: "Black" },
            fromColor: { type: String, default: "#000000" },
            toColor: { type: String, default: "#000000" },
            images: [{ type: String, required: true }],
            imagesToKeep: [{ type: String }],
        },
    ],
    type: {
        type: String,
        required: true,
    },
    materialsCategory: {
        type: String,
        required: true,
    },
    frameCategory: { type: String, required: true },
    sizeCategory: { type: String, required: true },
    shapeCategory: {
        type: String,
        required: true,
    },
    biologyCategory: { type: String, enum: ["men", "women", "kids"], required: true },
    color: { type: String, required: true },
    date: { type: Date, default: Date.now },
    purchase: { type: Number, required: true },
    salesPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    quantity: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    features: [{ type: String }],
    brand: { type: String, default: "No Brand" },
    barcode: { type: String, unique: true, required: true },
    badge: {
        type: String,
    },
    description: { type: String },
    weeklyDeals: { type: Boolean, default: false },
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Review" }],
    frameMeasurements: { type: String },
    frameDetails: { type: String },
    prescriptionDetails: { type: String },
    stock: { type: Boolean, default: true },
    frameWidth: { type: String, default: "Not-added" },
    bridge: { type: String, default: "Not-added" },
    lensWidth: { type: String, default: "Not-added" },
    lensHeight: { type: String, default: "Not-added" },
    templeLength: { type: String, default: "Not-added" },
    size: { type: String, default: "Not-added" },
    weight: { type: String, default: "Not-added" },
    pdRange: { type: String, default: "Not-added" },
    prescriptionRange: { type: String, default: "Not-added" },
    availableAsProBi: { type: Boolean, default: false },
    availableAsReader: { type: Boolean, default: false },
    rating: { type: Number, min: 0, max: 5, default: 0 },
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.default = Product;
//# sourceMappingURL=products.model.js.map