// src/types/salesItem.type.ts

export interface ISalesItem {
	name: string;
	category: string; // "lens" | "frame" | "sunglasses" | ...
	brand?: string;
	barcode?: string;
	price: number;
	purchasePrice?: number;
	quantity: number;
	discount?: number;
	total?: number;
	tax?: number;
	date: Date;

	// Lens-specific
	lensType?: "single vision" | "bifocal" | "progressive" | "reading";
	material?: "plastic" | "polycarbonate" | "high-index" | "glass";
	coatings?: string[];
	prescriptionRange?: string;
	index?: number;
	thickness?: string;
	color?: string;
	diameter?: number;

	// Product-specific
	materialsCategory?: string;
	frameCategory?: string;
	sizeCategory?: string;
	shapeCategory?: string;
	biologyCategory?: string;
	features?: string[];
	badge?: string;
}
