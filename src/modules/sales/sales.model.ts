import { Schema, model } from "mongoose";
import { ISalesItem } from "./sales.types";

const SalesItemSchema = new Schema<ISalesItem>(
	{
		name: { type: String, required: true },
		category: { type: String, required: true },
		brand: { type: String },
		barcode: { type: String },
		price: { type: Number, required: true },
		purchasePrice: { type: Number },
		quantity: { type: Number, required: true, min: 1 },
		discount: { type: Number, min: 0, max: 100, default: 0 },
		total: { type: Number, min: 0 },
		tax: { type: Number, min: 0 },
		date: { type: Date, required: true },

		// Lens-specific
		lensType: {
			type: String,
			enum: ["single vision", "bifocal", "progressive", "reading"],
		},
		material: {
			type: String,
			enum: ["plastic", "polycarbonate", "high-index", "glass"],
		},
		coatings: { type: [String], default: [] },
		prescriptionRange: { type: String },
		index: { type: Number },
		thickness: { type: String },
		color: { type: String },
		diameter: { type: Number },

		// Product-specific
		materialsCategory: { type: String },
		frameCategory: { type: String },
		sizeCategory: { type: String },
		shapeCategory: { type: String },
		biologyCategory: { type: String },
		features: { type: [String], default: [] },
		badge: { type: String },
	},
	{
		timestamps: true,
	}
);

export const SalesItem = model<ISalesItem>("SalesItem", SalesItemSchema);
