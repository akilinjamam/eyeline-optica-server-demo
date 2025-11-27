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
exports.Sale = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const prescriptionSchema = new mongoose_1.Schema({
    sphere: { type: String, default: null },
    cylinder: { type: String, default: null },
    axis: { type: String, default: null },
}, { _id: false });
const saleSchema = new mongoose_1.Schema({
    invoiceNo: { type: String, required: true },
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    tran_id: {
        type: String,
        required: true,
    },
    quantity: { type: Number, required: true },
    customer_name: { type: String, required: true },
    frameColorName: { type: String, default: "not-added" },
    customer_phone: { type: String, required: true },
    customer_address: { type: String, required: true },
    customer_email: { type: String, required: true },
    payableAmount: { type: Number, required: true },
    dueAmount: { type: Number, required: true },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        default: "",
    },
    lensId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Lens",
        default: "",
    },
    contactLensId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ContactLens",
        default: "",
    },
    accessoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Accessory",
        default: "",
    },
    paymentHistoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PaymentHistory",
        default: null,
    },
    deliveryFee: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "Order received", "processsing", "packaging", "on the way", "delivered"],
        default: "pending",
    },
    saleType: {
        type: String,
        enum: [
            "Only Frame",
            "Only Lens",
            "Only Contact-Lens",
            "Only Accessory",
            "Frame and Lens",
            "Contact-Lens and Accessory",
        ],
        required: true,
    },
    pd: {
        type: String,
        default: null,
    },
    leftEye: { type: prescriptionSchema, default: null },
    rightEye: { type: prescriptionSchema, default: null },
    prescriptionImg: { type: [String], default: null },
    submitType: { type: String, default: "" },
    dealsDiscount: { type: Number, default: 0 },
    discountOn: { type: String, default: "" },
}, {
    timestamps: true, // adds createdAt and updatedAt
});
exports.Sale = mongoose_1.default.models.Sale || mongoose_1.default.model("Sale", saleSchema);
//# sourceMappingURL=sale.model.js.map