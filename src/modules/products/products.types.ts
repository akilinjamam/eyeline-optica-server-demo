export type BiologyCategory = "men" | "women" | "kids";

export type TOtherImages = {
	_id?: string;
	colorName: string;
	fromColor: string;
	toColor: string;
	qty: number;
	images: string[];
	imagesToKeep?: string[];
};

export interface IProduct {
	name: string;
	slug?: string;
	images: string[];
	imageIds?: string[];
	type: string;
	materialsCategory: string;
	frameCategory: string;
	sizeCategory: string;
	shapeCategory: string;
	biologyCategory: BiologyCategory;
	color: string;
	date: Date;
	purchase: number;
	salesPrice: number;
	discount: number;
	quantity: number;
	sold: number;
	features: string[];
	brand: string;
	barcode: string;
	sizeCode: string;
	badge: string;
	description: string;
	weeklyDeals: boolean;
	reviews: string[];
	frameMeasurements: string;
	frameDetails: string;
	prescriptionDetails: string;
	stock: boolean;
	otherImages: TOtherImages[];
	deletableImgUrls?: string[];
	frameWidth: string;
	bridge: string;
	lensWidth: string;
	lensHeight: string;
	templeLength: string;
	size: string;
	weight: string;
	pdRange: string;
	prescriptionRange: string;
	availableAsProBi: boolean;
	availableAsReader: boolean;
	rating: number;
}
