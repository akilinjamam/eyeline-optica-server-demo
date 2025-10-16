import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISale extends Document {
	quantity: number;
	invoiceNo: string;
	tran_id: string;
	customerId: mongoose.Types.ObjectId;
	customer_name: string;
	customer_phone: string;
	customer_address: string;
	customer_email: string;
	payableAmount: number;
	dueAmount: number;
	productId: mongoose.Types.ObjectId;
	lensId: mongoose.Types.ObjectId;
	contactLensId: mongoose.Types.ObjectId;
	deliveryFee: number;
	subtotal: number;
	status: "pending" | "receieved" | "processsing" | "packaging" | "on the way" | "delivered";
}

const saleSchema = new Schema<ISale>(
	{
		invoiceNo: { type: String, required: true },
		customerId: {
			type: Schema.Types.ObjectId,
			ref: "Customer",
			required: true,
		},
		tran_id: {
			type: String,
			required: true,
		},
		quantity: { type: Number, required: true },
		customer_name: { type: String, required: true },
		customer_phone: { type: String, required: true },
		customer_address: { type: String, required: true },
		customer_email: { type: String, required: true },
		payableAmount: { type: Number, required: true },
		dueAmount: { type: Number, required: true },
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			default: "",
		},
		lensId: {
			type: Schema.Types.ObjectId,
			ref: "Lens",
			default: "",
		},
		contactLensId: {
			type: Schema.Types.ObjectId,
			ref: "ContactLens",
			default: "",
		},
		deliveryFee: { type: Number, required: true },
		subtotal: { type: Number, required: true },
		status: {
			type: String,
			enum: ["pending", "Order receieved", "processsing", "packaging", "on the way", "delivered"],
			default: "pending",
		},
	},
	{
		timestamps: true, // adds createdAt and updatedAt
	}
);

export const Sale: Model<ISale> = mongoose.models.Sale || mongoose.model<ISale>("Sale", saleSchema);
