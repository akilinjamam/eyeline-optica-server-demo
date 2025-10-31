import { z } from "zod";
export declare const contactLensSchema: z.ZodObject<{
    name: z.ZodString;
    brand: z.ZodString;
    color: z.ZodString;
    type: z.ZodUnion<[z.ZodEnum<{
        "daily disposable": "daily disposable";
        monthly: "monthly";
        "monthly (colored)": "monthly (colored)";
        weekly: "weekly";
        toric: "toric";
        multifocal: "multifocal";
    }>, z.ZodString]>;
    powerType: z.ZodUnion<[z.ZodEnum<{
        "with power": "with power";
        "without power": "without power";
    }>, z.ZodString]>;
    material: z.ZodString;
    waterContent: z.ZodString;
    diameter: z.ZodNumber;
    baseCurve: z.ZodNumber;
    powerRange: z.ZodString;
    uvProtection: z.ZodDefault<z.ZodBoolean>;
    purchasePrice: z.ZodNumber;
    salesPrice: z.ZodNumber;
    stock: z.ZodDefault<z.ZodBoolean>;
    quantity: z.ZodNumber;
    sold: z.ZodDefault<z.ZodNumber>;
    offer: z.ZodDefault<z.ZodNumber>;
    rating: z.ZodDefault<z.ZodNumber>;
    barcode: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    features: z.ZodOptional<z.ZodArray<z.ZodString>>;
    description: z.ZodOptional<z.ZodString>;
    images: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
export declare const createContactLensSchema: z.ZodObject<{
    name: z.ZodString;
    brand: z.ZodString;
    color: z.ZodString;
    type: z.ZodUnion<[z.ZodEnum<{
        "daily disposable": "daily disposable";
        monthly: "monthly";
        "monthly (colored)": "monthly (colored)";
        weekly: "weekly";
        toric: "toric";
        multifocal: "multifocal";
    }>, z.ZodString]>;
    powerType: z.ZodUnion<[z.ZodEnum<{
        "with power": "with power";
        "without power": "without power";
    }>, z.ZodString]>;
    material: z.ZodString;
    waterContent: z.ZodString;
    diameter: z.ZodNumber;
    baseCurve: z.ZodNumber;
    powerRange: z.ZodString;
    uvProtection: z.ZodDefault<z.ZodBoolean>;
    purchasePrice: z.ZodNumber;
    salesPrice: z.ZodNumber;
    stock: z.ZodDefault<z.ZodBoolean>;
    quantity: z.ZodNumber;
    sold: z.ZodDefault<z.ZodNumber>;
    offer: z.ZodDefault<z.ZodNumber>;
    rating: z.ZodDefault<z.ZodNumber>;
    barcode: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    features: z.ZodOptional<z.ZodArray<z.ZodString>>;
    description: z.ZodOptional<z.ZodString>;
    images: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
export declare const updateContactLensSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodUnion<[z.ZodEnum<{
        "daily disposable": "daily disposable";
        monthly: "monthly";
        "monthly (colored)": "monthly (colored)";
        weekly: "weekly";
        toric: "toric";
        multifocal: "multifocal";
    }>, z.ZodString]>>;
    powerType: z.ZodOptional<z.ZodUnion<[z.ZodEnum<{
        "with power": "with power";
        "without power": "without power";
    }>, z.ZodString]>>;
    material: z.ZodOptional<z.ZodString>;
    waterContent: z.ZodOptional<z.ZodString>;
    diameter: z.ZodOptional<z.ZodNumber>;
    baseCurve: z.ZodOptional<z.ZodNumber>;
    powerRange: z.ZodOptional<z.ZodString>;
    uvProtection: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    purchasePrice: z.ZodOptional<z.ZodNumber>;
    salesPrice: z.ZodOptional<z.ZodNumber>;
    stock: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    quantity: z.ZodOptional<z.ZodNumber>;
    sold: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    offer: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    rating: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    barcode: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodString>>>;
    features: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    images: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>;
}, z.core.$strip>;
//# sourceMappingURL=contactlens.validation.d.ts.map