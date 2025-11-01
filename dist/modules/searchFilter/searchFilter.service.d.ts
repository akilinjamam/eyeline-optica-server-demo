export declare const searchFilterService: {
    getSearchItemService: (search: Record<string, unknown>) => Promise<({
        category: string;
        _id: unknown;
        name: string;
        salesPrice: number;
        brand: string;
    } | {
        category: string;
        name: string;
        description?: string;
        purchasePrice: number;
        salesPrice: number;
        discount: number;
        barcode: string;
        stock: boolean;
        quantity: number;
        brand?: string;
        sold: number;
        images: string[];
        lensType: import("../lenses/lenses.types").LensType;
        material: import("../lenses/lenses.types").LensMaterial;
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
        badge: string;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    })[]>;
};
//# sourceMappingURL=searchFilter.service.d.ts.map