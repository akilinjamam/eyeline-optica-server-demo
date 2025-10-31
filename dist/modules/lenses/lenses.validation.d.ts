import { z } from "zod";
export declare const lensValidationSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    purchasePrice: z.ZodNumber;
    salesPrice: z.ZodNumber;
    discount: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    barcode: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    stock: z.ZodDefault<z.ZodBoolean>;
    quantity: z.ZodNumber;
    category: z.ZodDefault<z.ZodString>;
    brand: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodArray<z.ZodString>>;
    sold: z.ZodDefault<z.ZodNumber>;
    lensType: z.ZodEnum<{
        "single vision": "single vision";
        bifocal: "bifocal";
        progressive: "progressive";
        reading: "reading";
        "zero power": "zero power";
    }>;
    material: z.ZodEnum<{
        plastic: "plastic";
        polycarbonate: "polycarbonate";
        "high-index": "high-index";
        glass: "glass";
    }>;
    coatings: z.ZodOptional<z.ZodArray<z.ZodString>>;
    prescriptionRange: z.ZodOptional<z.ZodString>;
    index: z.ZodOptional<z.ZodNumber>;
    thickness: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    diameter: z.ZodOptional<z.ZodNumber>;
    warranty: z.ZodOptional<z.ZodString>;
    deliveryTime: z.ZodOptional<z.ZodString>;
    offer: z.ZodDefault<z.ZodNumber>;
    rating: z.ZodOptional<z.ZodNumber>;
    badge: z.ZodString;
}, z.core.$strip>;
export type LensInput = z.infer<typeof lensValidationSchema>;
//# sourceMappingURL=lenses.validation.d.ts.map