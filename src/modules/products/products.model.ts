import mongoose, { Schema, Model } from "mongoose";
import { IProduct } from "./products.types";

const ProductSchema = new Schema<IProduct>(
	{
		name: { type: String, required: true },
		images: [{ type: String }],
		otherImages: [
			{
				colorName: { type: String, required: true },
				fromColor: { type: String, required: true },
				toColor: { type: String, required: true },
				images: [{ type: String, required: true }],
				imagesToKeep: [{ type: String }],
			},
		],
		type: {
			type: String,
			enum: [
				"sunglasses",
				"eye glasses",
				"special glasses",
				"power sunglasses",
				"progressive lense",
			],
			required: true,
		},
		materialsCategory: {
			type: String,
			enum: ["metal", "plastic", "acetate", "titanium", "wood", "texture"],
			required: true,
		},
		frameCategory: { type: String, enum: ["full-rim", "half rim", "rimless"], required: true },
		sizeCategory: { type: String, enum: ["small", "medium", "large"], required: true },
		shapeCategory: {
			type: String,
			enum: ["oval", "round", "square", "cats eye", "rectangle", "avietor", "browline", "horn"],
			required: true,
		},
		biologyCategory: { type: String, enum: ["men", "women", "kids"], required: true },
		color: { type: String, required: true },
		date: { type: Date, default: Date.now },
		purchase: { type: Number, required: true },
		salesPrice: { type: Number, required: true },
		discount: { type: Number, default: 0 },
		quantity: { type: Number, required: true },
		sold: { type: Number, default: 0 },
		features: [{ type: String }],
		brand: { type: String, enum: ["raybon", "Alex Perry", "Oakley"], required: true },
		barcode: { type: String, unique: true, required: true },
		badge: {
			type: String,
			enum: ["popular", "new", "premium", "luxury", "best", "trending", "budget"],
		},
		description: { type: String },
		weeklyDeals: { type: Boolean, default: false },
		reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
		frameMeasurements: { type: String },
		frameDetails: { type: String },
		prescriptionDetails: { type: String },
		stock: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
