import { z } from "zod";
export declare const cartValidationSchema: z.ZodObject<{
    username: z.ZodString;
    phone: z.ZodNumber;
    address: z.ZodString;
    profileId: z.ZodOptional<z.ZodString>;
    productId: z.ZodOptional<z.ZodString>;
    lensId: z.ZodOptional<z.ZodString>;
    quantity: z.ZodNumber;
}, z.core.$strip>;
export type CartInput = z.infer<typeof cartValidationSchema>;
//# sourceMappingURL=cart.validation.d.ts.map