export interface ISalesItem {
    name: string;
    category: string;
    brand?: string;
    barcode?: string;
    price: number;
    purchasePrice?: number;
    quantity: number;
    discount?: number;
    total?: number;
    tax?: number;
    date: Date;
    lensType?: "single vision" | "bifocal" | "progressive" | "reading";
    material?: "plastic" | "polycarbonate" | "high-index" | "glass";
    coatings?: string[];
    prescriptionRange?: string;
    index?: number;
    thickness?: string;
    color?: string;
    diameter?: number;
    materialsCategory?: string;
    frameCategory?: string;
    sizeCategory?: string;
    shapeCategory?: string;
    biologyCategory?: string;
    features?: string[];
    badge?: string;
}
//# sourceMappingURL=sales.types.d.ts.map