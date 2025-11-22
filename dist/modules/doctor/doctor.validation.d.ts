import { z } from "zod";
export declare const DoctorSchemaZod: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodEmail;
    specialities: z.ZodOptional<z.ZodArray<z.ZodString>>;
    studies: z.ZodOptional<z.ZodArray<z.ZodString>>;
    totalExperience: z.ZodOptional<z.ZodNumber>;
    bmdcNumber: z.ZodOptional<z.ZodString>;
    ratings: z.ZodOptional<z.ZodNumber>;
    currentlyWorking: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    experienceDetail: z.ZodOptional<z.ZodString>;
    clinicName: z.ZodOptional<z.ZodString>;
    clinicAddress: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodArray<z.ZodString>>;
    appointmentFee: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const ReviewSchemaZod: z.ZodObject<{
    doctor: z.ZodString;
    reviewerName: z.ZodString;
    comment: z.ZodString;
    rating: z.ZodNumber;
    date: z.ZodOptional<z.ZodPipe<z.ZodTransform<Date, unknown>, z.ZodDate>>;
}, z.core.$strip>;
export type ReviewInput = z.infer<typeof ReviewSchemaZod>;
export type DoctorInput = z.infer<typeof DoctorSchemaZod>;
//# sourceMappingURL=doctor.validation.d.ts.map