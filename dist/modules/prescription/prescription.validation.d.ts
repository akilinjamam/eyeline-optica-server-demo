import { z } from "zod";
export declare const MedicineSchema: z.ZodObject<{
    name: z.ZodString;
    dosage: z.ZodString;
    frequency: z.ZodString;
    duration: z.ZodString;
}, z.core.$strip>;
export declare const PrescriptionSchema: z.ZodObject<{
    doctorId: z.ZodString;
    patientId: z.ZodString;
    date: z.ZodString;
    diagnosis: z.ZodString;
    medicines: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        dosage: z.ZodString;
        frequency: z.ZodString;
        duration: z.ZodString;
    }, z.core.$strip>>;
    tests: z.ZodString;
    advice: z.ZodString;
}, z.core.$strip>;
export type PrescriptionInput = z.infer<typeof PrescriptionSchema>;
//# sourceMappingURL=prescription.validation.d.ts.map