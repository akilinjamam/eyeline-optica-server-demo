import { Schema, model } from "mongoose";
import { IFcbProduct } from "./product.interface";

const productSchema = new Schema<IFcbProduct>(
	{
		name: { type: String, required: true, trim: true },
		sku: { type: String, required: true, unique: true, trim: true },
		slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
		category: { type: String, required: true, trim: true },
		unit: { type: String, enum: ["piece", "meter", "yard"], default: "piece" },
		images: { type: [String], default: [] },
		purchasePrice: { type: Number, required: true, min: 0 },
		sellingPrice: { type: Number, required: true, min: 0 },
		stockQuantity: { type: Number, required: true, default: 0 },
		lowStockAlert: { type: Number, default: 5 },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

productSchema.pre("validate", function (next) {
	if (this.name && !this.slug) {
		this.slug = this.name
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-");
	}
	next();
});

export const FcbProduct = model<IFcbProduct>("FcbProduct", productSchema);
