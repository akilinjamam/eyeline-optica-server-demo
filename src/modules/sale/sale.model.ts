import mongoose, { Schema, Document, Model } from "mongoose";
import { IPrescriptionSchema } from "../cart/cart.model";

export interface ISale extends Document {
	saleType:
		| "Only Frame"
		| "Only Lens"
		| "Only Contact-Lens"
		| "Only Accessory"
		| "Frame and Lens"
		| "Contact-Lens and Accessory";
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
	accessoryId: mongoose.Types.ObjectId;
	paymentHistoryId: mongoose.Types.ObjectId;
	deliveryFee: number;
	subtotal: number;
	status: "pending" | "Order received" | "processsing" | "packaging" | "on the way" | "delivered";
	pd: string;
	prescriptionImg: string[];
	leftEye: IPrescriptionSchema;
	rightEye: IPrescriptionSchema;
	submitType: string;
}

const prescriptionSchema = new Schema<IPrescriptionSchema>(
	{
		sphere: { type: String, default: null },
		cylinder: { type: String, default: null },
		axis: { type: String, default: null },
	},
	{ _id: false }
);

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
		accessoryId: {
			type: Schema.Types.ObjectId,
			ref: "Accessory",
			default: "",
		},
		paymentHistoryId: {
			type: Schema.Types.ObjectId,
			ref: "PaymentHistory",
			default: null,
		},
		deliveryFee: { type: Number, required: true },
		subtotal: { type: Number, required: true },
		status: {
			type: String,
			enum: ["pending", "Order received", "processsing", "packaging", "on the way", "delivered"],
			default: "pending",
		},
		saleType: {
			type: String,
			enum: [
				"Only Frame",
				"Only Lens",
				"Only Contact-Lens",
				"Only Accessory",
				"Frame and Lens",
				"Contact-Lens and Accessory",
			],
			required: true,
		},
		pd: {
			type: String,
			default: null,
		},
		leftEye: { type: prescriptionSchema, default: null },
		rightEye: { type: prescriptionSchema, default: null },
		prescriptionImg: { type: [String], default: null },
		submitType: { type: String, default: "" },
	},
	{
		timestamps: true, // adds createdAt and updatedAt
	}
);

export const Sale: Model<ISale> = mongoose.models.Sale || mongoose.model<ISale>("Sale", saleSchema);
