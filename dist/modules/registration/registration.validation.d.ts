import { z } from "zod";
export declare const registrationSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<{
        doctor: "doctor";
        employee: "employee";
    }>;
    password: z.ZodString;
}, z.core.$strip>;
export type RegistrationInput = z.infer<typeof registrationSchema>;
//# sourceMappingURL=registration.validation.d.ts.map