import { Schema, model } from "mongoose";
import { IFcbSale, IFcbSaleItem } from "./sales.interface";

const saleItemSchema = new Schema<IFcbSaleItem>(
	{
		product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
		quantity: { type: Number, required: true, min: 0.01 },
		sellingPrice: { type: Number, required: true, min: 0 },
		costPriceAtSale: { type: Number, required: true, min: 0 },
		subtotal: { type: Number, required: true, min: 0 },
	},
	{ _id: false }
);

const saleSchema = new Schema<IFcbSale>(
	{
		invoiceNo: { type: String, required: true, unique: true, trim: true },
		customer: { type: Schema.Types.ObjectId, ref: "Customer", default: null },
		items: {
			type: [saleItemSchema],
			required: true,
			validate: [(val: IFcbSaleItem[]) => val.length > 0, "At least one sale item is required"],
		},
		subtotalAmount: { type: Number, required: true, min: 0 },
		discount: { type: Number, required: true, default: 0, min: 0 },
		totalAmount: { type: Number, required: true, min: 0 },
		paidAmount: { type: Number, required: true, default: 0, min: 0 },
		dueAmount: { type: Number, required: true, default: 0, min: 0 },
		paymentMethod: {
			type: String,
			enum: ["cash", "bkash", "nagad", "bank", "card"],
			default: "cash",
		},
		paymentStatus: {
			type: String,
			enum: ["paid", "partial", "due"],
			default: "paid",
		},
		saleDate: { type: Date, default: Date.now },
		note: { type: String, trim: true },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const FcbSale = model<IFcbSale>("FcbSale", saleSchema);
