export type ProductType =
	| "sunglasses"
	| "eye glasses"
	| "special glasses"
	| "power sunglasses"
	| "progressive lense";

export type MaterialCategory = "metal" | "plastic" | "acetate" | "titanium" | "wood" | "texture";

export type FrameCategory = "full-rim" | "half rim" | "rimless";

export type SizeCategory = "small" | "medium" | "large";

export type ShapeCategory =
	| "oval"
	| "round"
	| "square"
	| "cats eye"
	| "rectangle"
	| "avietor"
	| "browline"
	| "horn";

export type BiologyCategory = "men" | "women" | "kids";

export type Badge = "popular" | "new" | "premium" | "luxury" | "best" | "trending" | "budget";

export type Brand = "raybon" | "Alex Perry" | "Oakley";

export interface IProduct {
	name: string;
	images: string[];
	type: ProductType;
	materialsCategory: MaterialCategory;
	frameCategory: FrameCategory;
	sizeCategory: SizeCategory;
	shapeCategory: ShapeCategory;
	biologyCategory: BiologyCategory;
	color: string;
	date: Date;
	purchase: number;
	salesPrice: number;
	discount: number;
	quantity: number;
	sold: number;
	features: string[];
	brand: Brand;
	barcode: string;
	badge: Badge;
	description: string;
	weeklyDeals: boolean;
	reviews: string[];
	frameMeasurements: string;
	frameDetails: string;
	prescriptionDetails: string;
	stock: boolean;
}
