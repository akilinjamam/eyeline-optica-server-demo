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
exports.Doctor = exports.Review = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const DoctorSchema = new mongoose_1.Schema({
    name: { type: String, default: "add your name" },
    email: { type: String, required: true },
    specialities: { type: [String], default: "add your specialities like Cardiology, Neurology" },
    studies: { type: [String], default: "add your Studies like MBBS, FCPS, FRCS" },
    totalExperience: { type: Number, default: 0 },
    bmdcNumber: { type: String, unique: true, default: "add your bmdc number" },
    currentlyWorking: { type: String, default: "add where you work now" },
    description: { type: String, default: "write something about you" },
    experienceDetail: { type: String, default: "write your experience history" },
    images: { type: [String], default: [] }, // e.g. Cloudinary/S3 URLs
}, { timestamps: true });
const ReviewSchema = new mongoose_1.Schema({
    doctor: { type: mongoose_1.Schema.Types.ObjectId, ref: "Doctor", required: true }, // FK
    reviewerName: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Review = mongoose_1.default.model("Review", ReviewSchema);
exports.Doctor = mongoose_1.default.model("Doctor", DoctorSchema);
//# sourceMappingURL=doctor.model.js.map