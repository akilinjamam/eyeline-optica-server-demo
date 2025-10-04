"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionSchema = exports.MedicineSchema = void 0;
const zod_1 = require("zod");
exports.MedicineSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Medicine name is required"),
    dosage: zod_1.z.string().min(1, "Dosage is required"),
    frequency: zod_1.z.string().min(1, "Frequency is required"),
    duration: zod_1.z.string().min(1, "Duration is required"),
});
exports.PrescriptionSchema = zod_1.z.object({
    doctorId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid doctorId"),
    patientId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid patientId"),
    date: zod_1.z.string().min(1, "Date is required"),
    diagnosis: zod_1.z.string().min(1, "Diagnosis is required"),
    medicines: zod_1.z.array(exports.MedicineSchema).nonempty("At least one medicine is required"),
    tests: zod_1.z.string().min(1, "Tests field is required"),
    advice: zod_1.z.string().min(1, "Advice is required"),
});
//# sourceMappingURL=prescription.validation.js.map