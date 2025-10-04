import { z } from "zod";
export declare const salesItemSchema: z.ZodObject<{
    name: z.ZodString;
    category: z.ZodString;
    brand: z.ZodOptional<z.ZodString>;
    barcode: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    purchasePrice: z.ZodOptional<z.ZodNumber>;
    quantity: z.ZodNumber;
    discount: z.ZodOptional<z.ZodNumber>;
    total: z.ZodOptional<z.ZodNumber>;
    tax: z.ZodOptional<z.ZodNumber>;
    date: z.ZodDate;
    lensType: z.ZodOptional<z.ZodEnum<{
        "single vision": "single vision";
        bifocal: "bifocal";
        progressive: "progressive";
        reading: "reading";
    }>>;
    material: z.ZodOptional<z.ZodEnum<{
        plastic: "plastic";
        polycarbonate: "polycarbonate";
        "high-index": "high-index";
        glass: "glass";
    }>>;
    coatings: z.ZodOptional<z.ZodArray<z.ZodString>>;
    prescriptionRange: z.ZodOptional<z.ZodString>;
    index: z.ZodOptional<z.ZodNumber>;
    thickness: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    diameter: z.ZodOptional<z.ZodNumber>;
    materialsCategory: z.ZodOptional<z.ZodString>;
    frameCategory: z.ZodOptional<z.ZodString>;
    sizeCategory: z.ZodOptional<z.ZodString>;
    shapeCategory: z.ZodOptional<z.ZodString>;
    biologyCategory: z.ZodOptional<z.ZodString>;
    features: z.ZodOptional<z.ZodArray<z.ZodString>>;
    badge: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SalesItemInput = z.infer<typeof salesItemSchema>;
//# sourceMappingURL=sales.validation.d.ts.map