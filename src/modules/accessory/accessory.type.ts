import mongoose from "mongoose";

export type TAccessory = {
	customerId: mongoose.Types.ObjectId;
	name: string;
	brand: string;
	type:
		| "With Solution"
		| "With Bag"
		| "With Kit"
		| "With Solution + Kit"
		| "With Solution + Bag"
		| "With Kit + Bag"
		| "With Solution + Bag + Kit"
		| "others";
	category: string;
	quantity: number;
	stock: boolean;
	purchasePrice: number;
	salesPrice: number;
	sold: number;
	measurement: string;
};
