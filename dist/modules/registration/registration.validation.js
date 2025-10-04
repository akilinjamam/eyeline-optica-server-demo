"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationSchema = void 0;
// src/validations/registration.validation.ts
const zod_1 = require("zod");
exports.registrationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name must be at most 50 characters long"),
    email: zod_1.z.string().email("Invalid email address"),
    role: zod_1.z.enum(["doctor", "employee"]),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password must be at most 100 characters long"),
});
//# sourceMappingURL=registration.validation.js.map