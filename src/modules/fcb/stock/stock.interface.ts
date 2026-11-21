import { Types } from "mongoose";

export interface IStock {
	productId: Types.ObjectId;
	supplierId?: Types.ObjectId | null;
	batchCode?: string;
	purchasePrice: number;
	salesPrice: number;
	quantity: number;
	remainingQuantity: number;
	lowStockAlert: number;
	note?: string;
	isDeleted: boolean;
}

export interface ICreateStockInput {
	productId: string;
	supplierId?: string | null;
	batchCode?: string;
	purchasePrice: number;
	salesPrice: number;
	quantity: number;
	lowStockAlert?: number;
	note?: string;
}
