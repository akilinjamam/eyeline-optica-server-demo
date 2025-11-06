import { IWeeklyDeals } from "../weeklyDeals/weeklydeals.model";
export declare const searchFilterService: {
    getSearchItemService: (search: Record<string, unknown>) => Promise<({
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
        weeklyDeals: boolean;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    } | {
        category: string;
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
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    } | {
        category: string;
        _id: unknown;
        images: string[];
        color: string;
        name: string;
        salesPrice: number;
        brand: string;
        weeklyDeals: boolean;
        badge: string;
    })[]>;
    updateWeeklyDeals: (payload: IWeeklyDeals, id: string) => Promise<import("mongoose").UpdateWriteOpResult>;
    getWeeklyDeals: () => Promise<(import("mongoose").Document<unknown, {}, IWeeklyDeals, {}, {}> & IWeeklyDeals & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | undefined>;
};
//# sourceMappingURL=searchFilter.service.d.ts.map