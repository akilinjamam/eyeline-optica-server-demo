import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPaymentHistory extends Document {
	customerId: mongoose.Types.ObjectId;
	productId: mongoose.Types.ObjectId;
	lensId: mongoose.Types.ObjectId;
	contactLensId: mongoose.Types.ObjectId;
	accessoryId: mongoose.Types.ObjectId;
	payableAmount: number;
	quantity: number;
	dueAmount: number;
	deliveryFee: number;
	subtotal: number;
	status: "Order received" | "processsing" | "packaging" | "on the way" | "delivered";
	dealsOn: string;
	dealsDiscount: number;
}

const paymentHistorySchema = new Schema<IPaymentHistory>(
	{
		customerId: {
			type: Schema.Types.ObjectId,
			ref: "Customer",
			required: true,
		},
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
		payableAmount: { type: Number, required: true },
		quantity: { type: Number, required: true },
		dueAmount: { type: Number, required: true },
		deliveryFee: { type: Number, required: true },
		subtotal: { type: Number, required: true },
		status: {
			type: String,
			enum: ["Order received", "processsing", "packaging", "on the way", "delivered"],
			default: "Order received",
		},
		dealsOn: { type: String, default: "" },
		dealsDiscount: { type: Number, default: 0 },
	},
	{
		timestamps: true, // adds createdAt & updatedAt automatically
	}
);

export const PaymentHistory: Model<IPaymentHistory> =
	mongoose.models.PaymentHistory ||
	mongoose.model<IPaymentHistory>("PaymentHistory", paymentHistorySchema);
