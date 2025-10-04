"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchemaZod = exports.DoctorSchemaZod = void 0;
const zod_1 = require("zod");
exports.DoctorSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    specialities: zod_1.z.array(zod_1.z.string().min(1)).nonempty("At least one speciality is required"),
    studies: zod_1.z.array(zod_1.z.string().min(1)).nonempty("At least one study is required"),
    totalExperience: zod_1.z.number().min(0, "Experience must be positive"),
    bmdcNumber: zod_1.z.string().min(1, "BMDC number is required"),
    ratings: zod_1.z.number().min(0).optional(),
    currentlyWorking: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    experienceDetail: zod_1.z.string().optional(),
    images: zod_1.z.array(zod_1.z.string().url()).optional(),
});
exports.ReviewSchemaZod = zod_1.z.object({
    doctor: zod_1.z.string().min(1, "Doctor ID is required"), // expecting ObjectId as string
    reviewerName: zod_1.z.string().min(1, "Reviewer name is required"),
    comment: zod_1.z.string().min(1, "Comment is required"),
    rating: zod_1.z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
    date: zod_1.z.preprocess((arg) => (arg ? new Date(arg) : new Date()), zod_1.z.date()).optional(),
});
//# sourceMappingURL=doctor.validation.js.map