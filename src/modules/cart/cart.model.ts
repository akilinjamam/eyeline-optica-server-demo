import mongoose, { Schema, Document } from "mongoose";

interface ICartItem {
	productId?: mongoose.Schema.Types.ObjectId; // Frame
	lensId?: mongoose.Schema.Types.ObjectId; // Lens
	contactLensId?: mongoose.Schema.Types.ObjectId; // Contact Lens
	accessoryId?: mongoose.Schema.Types.ObjectId; // Accessory

	type: "frame" | "frame_with_lens" | "lens" | "contact_lens" | "accessory";
	quantity: number;
	unitPrice: number; // Price at time of adding to cart
	subtotal: number; // quantity * unitPrice
}

export interface ICart extends Document {
	customerName: string;
	phoneNumber: string;
	email: string;
	address: string;
	items: ICartItem[];
	totalAmount: number;
	deliveryFee: number;
	createdAt: Date;
	updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>(
	{
		productId: { type: Schema.Types.ObjectId, ref: "Product" },
		lensId: { type: Schema.Types.ObjectId, ref: "Lens" },
		contactLensId: { type: Schema.Types.ObjectId, ref: "ContactLens" },
		accessoryId: { type: Schema.Types.ObjectId, ref: "Accessory" },
		type: {
			type: String,
			enum: ["frame", "frame_with_lens", "lens", "contact_lens", "accessory"],
			required: true,
		},
		quantity: { type: Number, required: true, min: 1 },
		unitPrice: { type: Number, required: true },
		subtotal: { type: Number, required: true },
	},
	{ _id: false }
);

const CartSchema = new Schema<ICart>(
	{
		customerName: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		email: { type: String },
		address: { type: String },
		items: { type: [CartItemSchema], required: true, default: [] },
		totalAmount: { type: Number, required: true, default: 0 },
		deliveryFee: { type: Number, required: true, default: 0 },
	},
	{ timestamps: true }
);

export const Cart = mongoose.model<ICart>("Cart", CartSchema);
