// src/types/lens.type.ts

export type LensType = "single vision" | "bifocal" | "progressive" | "reading";

export type LensMaterial = "plastic" | "polycarbonate" | "high-index" | "glass";

export interface ILens {
	name: string;
	description?: string;
	price: number;
	stock: number;
	category: string;
	brand?: string;
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
