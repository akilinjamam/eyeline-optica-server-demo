import { z } from "zod";
export declare const accessoryItemSchema: z.ZodObject<{
    name: z.ZodString;
    barcode: z.ZodDefault<z.ZodString>;
    brand: z.ZodString;
    category: z.ZodString;
    quantity: z.ZodNumber;
    stock: z.ZodDefault<z.ZodBoolean>;
    purchasePrice: z.ZodNumber;
    salesPrice: z.ZodNumber;
    discount: z.ZodDefault<z.ZodNumber>;
    sold: z.ZodDefault<z.ZodNumber>;
    measurement: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export declare const accessorySchema: z.ZodObject<{
    images: z.ZodDefault<z.ZodArray<z.ZodString>>;
    type: z.ZodDefault<z.ZodEnum<{
        "With Solution": "With Solution";
        "With Bag": "With Bag";
        "With Kit": "With Kit";
        "With Solution + Kit": "With Solution + Kit";
        "With Solution + Bag": "With Solution + Bag";
        "With Kit + Bag": "With Kit + Bag";
        "With Solution + Bag + Kit": "With Solution + Bag + Kit";
        others: "others";
    }>>;
    weeklyDeals: z.ZodDefault<z.ZodBoolean>;
    rating: z.ZodDefault<z.ZodNumber>;
    items: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        barcode: z.ZodDefault<z.ZodString>;
        brand: z.ZodString;
        category: z.ZodString;
        quantity: z.ZodNumber;
        stock: z.ZodDefault<z.ZodBoolean>;
        purchasePrice: z.ZodNumber;
        salesPrice: z.ZodNumber;
        discount: z.ZodDefault<z.ZodNumber>;
        sold: z.ZodDefault<z.ZodNumber>;
        measurement: z.ZodString;
        description: z.ZodDefault<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type AccessoryInput = z.infer<typeof accessorySchema>;
export type AccessoryItemInput = z.infer<typeof accessoryItemSchema>;
//# sourceMappingURL=accessory.validation.d.ts.map