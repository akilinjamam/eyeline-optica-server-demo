export type IContactLens = {
    id?: string;
    name: string;
    brand: string;
    color: string;
    type: "daily disposable" | "weekly" | "monthly" | "monthly (colored)" | "toric" | "multifocal" | string;
    material: string;
    waterContent: string;
    diameter: number;
    baseCurve: number;
    powerRange: string;
    uvProtection: boolean;
    purchasePrice: number;
    features: string[];
    salesPrice: number;
    stock: boolean;
    sold: number;
    quantity: number;
    offer: number;
    barcode: string;
    rating: number;
    description: string;
    images: string[];
    powerType: "with power" | "without Power";
    weeklyDeals: boolean;
    badge: string;
};
//# sourceMappingURL=contactlens.type.d.ts.map