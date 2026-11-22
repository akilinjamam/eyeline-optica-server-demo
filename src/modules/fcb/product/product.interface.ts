import { Types } from "mongoose";

export type TUnitType = "piece" | "meter" | "yard";

export interface IFcbProduct {
  name: string;
  sku: string;
  slug: string;
  category: string;
  unit: TUnitType;
  images: string[];
  stockId?: Types.ObjectId | null;
  purchasePrice: number;
  salesPrice: number;
  stockQuantity: number;
  lowStockAlert: number;
  isDeleted: boolean;
}
