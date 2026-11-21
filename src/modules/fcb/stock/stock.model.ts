import { Schema, model } from "mongoose";
import { IStock } from "./stock.interface";

const stockSchema = new Schema<IStock>(
	{
		productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
		supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", default: null },
		batchCode: { type: String, trim: true },
		purchasePrice: { type: Number, required: true, min: 0 },
		salesPrice: { type: Number, required: true, min: 0 },
		quantity: { type: Number, required: true, min: 0 },
		remainingQuantity: { type: Number, required: true, min: 0 },
		lowStockAlert: { type: Number, default: 5, min: 0 },
		note: { type: String, trim: true },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const Stock = model<IStock>("Stock", stockSchema);
