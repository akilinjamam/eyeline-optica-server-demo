export type TUnitType = "piece" | "meter" | "yard";

export interface IFcbProduct {
	name: string;
	sku: string;
	slug: string;
	category: string;
	unit: TUnitType;
	images: string[];
	purchasePrice: number;
	sellingPrice: number;
	stockQuantity: number;
	lowStockAlert: number;
	isDeleted: boolean;
}
