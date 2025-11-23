import { Document, Model } from "mongoose";
export interface IAccessoryItems extends Document {
    name: string;
    barcode: string;
    brand: string;
    discount: number;
    category: string;
    quantity: number;
    stock: boolean;
    purchasePrice: number;
    salesPrice: number;
    sold: number;
    description: string;
    measurement: string;
}
export interface IAccessory extends Document {
    images: string[];
    type: "With Solution" | "With Bag" | "With Kit" | "With Solution + Kit" | "With Solution + Bag" | "With Kit + Bag" | "With Solution + Bag + Kit" | "others";
    weeklyDeals: boolean;
    rating: number;
    items: IAccessoryItems[];
}
declare const Accessory: Model<IAccessory>;
export default Accessory;
//# sourceMappingURL=accessory.model.d.ts.map