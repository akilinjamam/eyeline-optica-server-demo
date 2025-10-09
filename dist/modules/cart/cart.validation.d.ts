import { z } from "zod";
export declare const cartItemSchema: z.ZodObject<{
    type: z.ZodEnum<{
        lens: "lens";
        frame: "frame";
        frame_with_lens: "frame_with_lens";
        contact_lens: "contact_lens";
        accessory: "accessory";
    }>;
    productId: z.ZodOptional<z.ZodString>;
    lensId: z.ZodOptional<z.ZodString>;
    contactLensId: z.ZodOptional<z.ZodString>;
    accessoryId: z.ZodOptional<z.ZodString>;
    prescriptionImg: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    pd: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    rightEye: z.ZodOptional<z.ZodObject<{
        sphere: z.ZodOptional<z.ZodString>;
        cylinder: z.ZodOptional<z.ZodString>;
        axis: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    leftEye: z.ZodOptional<z.ZodObject<{
        sphere: z.ZodOptional<z.ZodString>;
        cylinder: z.ZodOptional<z.ZodString>;
        axis: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
    subtotal: z.ZodNumber;
}, z.core.$strip>;
export declare const cartValidationSchema: z.ZodObject<{
    customerName: z.ZodString;
    phoneNumber: z.ZodString;
    email: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    address: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    items: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            lens: "lens";
            frame: "frame";
            frame_with_lens: "frame_with_lens";
            contact_lens: "contact_lens";
            accessory: "accessory";
        }>;
        productId: z.ZodOptional<z.ZodString>;
        lensId: z.ZodOptional<z.ZodString>;
        contactLensId: z.ZodOptional<z.ZodString>;
        accessoryId: z.ZodOptional<z.ZodString>;
        prescriptionImg: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
        pd: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        rightEye: z.ZodOptional<z.ZodObject<{
            sphere: z.ZodOptional<z.ZodString>;
            cylinder: z.ZodOptional<z.ZodString>;
            axis: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        leftEye: z.ZodOptional<z.ZodObject<{
            sphere: z.ZodOptional<z.ZodString>;
            cylinder: z.ZodOptional<z.ZodString>;
            axis: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        subtotal: z.ZodNumber;
    }, z.core.$strip>>;
    totalAmount: z.ZodNumber;
    deliveryFee: z.ZodNumber;
}, z.core.$strip>;
export type CartInput = z.infer<typeof cartValidationSchema>;
//# sourceMappingURL=cart.validation.d.ts.map