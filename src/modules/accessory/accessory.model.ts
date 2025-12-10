import mongoose, { Schema, Document, Model } from "mongoose";

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
	imageIds: string[];
	type:
		| "With Solution"
		| "With Bag"
		| "With Kit"
		| "With Solution + Kit"
		| "With Solution + Bag"
		| "With Kit + Bag"
		| "With Solution + Bag + Kit"
		| "others";
	weeklyDeals: boolean;
	rating: number;
	items: IAccessoryItems[];
}

const AccessoryItemsSchema = new Schema<IAccessoryItems>({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	barcode: {
		type: String,
		trim: true,
		default: "not-added",
	},
	brand: {
		type: String,
		required: true,
		trim: true,
	},
	category: {
		type: String,
		required: true,
		trim: true,
	},
	quantity: {
		type: Number,
		required: true,
		min: 0,
	},
	stock: {
		type: Boolean,
		default: true,
	},
	purchasePrice: {
		type: Number,
		required: true,
		min: 0,
	},
	salesPrice: {
		type: Number,
		required: true,
		min: 0,
	},
	discount: { type: Number, default: 0 },
	sold: {
		type: Number,
		default: 0,
		min: 0,
	},
	measurement: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		default: "not-added",
	},
});

const AccessorySchema = new Schema<IAccessory>(
	{
		images: { type: [String], default: [] },
		imageIds: { type: [String], default: [] },
		weeklyDeals: { type: Boolean, default: false },
		type: {
			type: String,
			enum: [
				"With Solution",
				"With Bag",
				"With Kit",
				"With Solution + Kit",
				"With Solution + Bag",
				"With Kit + Bag",
				"With Solution + Bag + Kit",
				"others",
			],
			default: "others",
		},
		rating: { type: Number, min: 0, max: 5, default: 0 },
		items: { type: [AccessoryItemsSchema], required: true, default: [] },
	},
	{
		timestamps: true,
	}
);

const Accessory: Model<IAccessory> =
	mongoose.models.Accessory || mongoose.model<IAccessory>("Accessory", AccessorySchema);

export default Accessory;
