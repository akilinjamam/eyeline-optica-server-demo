import mongoose, { Schema, Model } from "mongoose";
import { IProduct } from "./products.types";

const ProductSchema = new Schema<IProduct>(
	{
		name: { type: String, required: true },
		images: [{ type: String }],
		otherImages: [
			{
				colorName: { type: String, default: "Black" },
				fromColor: { type: String, default: "#000000" },
				toColor: { type: String, default: "#000000" },
				images: [{ type: String, required: true }],
				imagesToKeep: [{ type: String }],
			},
		],
		type: {
			type: String,
			required: true,
		},
		materialsCategory: {
			type: String,
			required: true,
		},
		frameCategory: { type: String, required: true },
		sizeCategory: { type: String, required: true },
		shapeCategory: {
			type: String,
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
		brand: { type: String, default: "No Brand" },
		barcode: { type: String, unique: true, required: true },
		sizeCode: { type: String, default: "Not-added" },
		badge: {
			type: String,
		},
		description: { type: String },
		weeklyDeals: { type: Boolean, default: false },
		reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
		frameMeasurements: { type: String },
		frameDetails: { type: String },
		prescriptionDetails: { type: String },
		stock: { type: Boolean, default: true },
		frameWidth: { type: String, default: "Not-added" },
		bridge: { type: String, default: "Not-added" },
		lensWidth: { type: String, default: "Not-added" },
		lensHeight: { type: String, default: "Not-added" },
		templeLength: { type: String, default: "Not-added" },
		size: { type: String, default: "Not-added" },
		weight: { type: String, default: "Not-added" },
		pdRange: { type: String, default: "Not-added" },
		prescriptionRange: { type: String, default: "Not-added" },
		availableAsProBi: { type: Boolean, default: false },
		availableAsReader: { type: Boolean, default: false },
		rating: { type: Number, min: 0, max: 5, default: 0 },
	},
	{ timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
