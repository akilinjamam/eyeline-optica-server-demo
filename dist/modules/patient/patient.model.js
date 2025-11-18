"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const mongoose_1 = require("mongoose");
const PatientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    doctorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    slotId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Slot",
        required: true,
    },
}, {
    timestamps: true,
});
exports.Patient = (0, mongoose_1.model)("Patient", PatientSchema);
//# sourceMappingURL=patient.model.js.map