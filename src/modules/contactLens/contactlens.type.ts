export type IContactLens = {
	id?: string;
	name: string;
	brand: string;
	color: string;
	type: "daily disposable" | "monthly" | "monthly (colored)" | string; // extendable
	material: string;
	waterContent: string; // e.g. "38%" (kept as string for flexibility)
	diameter: number; // mm
	baseCurve: number; // mm
	powerRange: string; // e.g. "-12.00 to +8.00"
	uvProtection: boolean;
	purchasePrice: number;
	salesPrice: number;
	stock: number;
	offer: number; // percentage (0-100)
	rating: number; // 1-5
	description: string;
	images: string[];
};
