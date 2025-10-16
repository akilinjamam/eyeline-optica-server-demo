export type LensType = "single vision" | "bifocal" | "progressive" | "reading" | "zero power";
export type LensMaterial = "plastic" | "polycarbonate" | "high-index" | "glass";
export interface ILens {
    name: string;
    description?: string;
    purchasePrice: number;
    salesPrice: number;
    stock: boolean;
    quantity: number;
    category: string;
    brand?: string;
    sold: number;
    images: string[];
    lensType: LensType;
    material: LensMaterial;
    coatings?: string[];
    prescriptionRange?: string;
    index?: number;
    thickness?: string;
    color?: string;
    diameter?: number;
    warranty?: string;
    deliveryTime?: string;
    offer?: number;
    rating?: number;
}
//# sourceMappingURL=lenses.types.d.ts.map