"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registrationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // email must be unique
        lowercase: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["doctor", "employee", "admin", "employee & admin", "doctor & admin"],
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    access: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // adds createdAt and updatedAt
});
registrationSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
    next();
});
registrationSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt_1.default.compare(candidatePassword, this.password);
};
// --- Create Model
exports.RegistrationModel = (0, mongoose_1.model)("Registration", registrationSchema);
//# sourceMappingURL=registration.model.js.map