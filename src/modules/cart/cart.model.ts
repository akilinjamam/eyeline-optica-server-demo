import mongoose, { Schema, Document } from "mongoose";

export interface IPrescriptionSchema {
	sphere: string;
	cylinder: string;
	axis: string;
	near: string;
}

export type TPowerType = "with_power" | "without_power";

// how the customer provides power when powerType is "with_power"
export type TSubmitType = "add_power" | "prescription_image" | "submit_power_later";

export interface ICartItem extends Document {
	productId?: mongoose.Schema.Types.ObjectId; // Frame
	lensId?: mongoose.Schema.Types.ObjectId; // Lens
	contactLensId?: mongoose.Schema.Types.ObjectId; // Contact Lens
	accessoryId?: mongoose.Schema.Types.ObjectId; // Accessory
	prescriptionImg?: String[];
	rightEye: IPrescriptionSchema;
	leftEye: IPrescriptionSchema;
	pd: number;
	type:
		| "frame"
		| "frame_with_lens"
		| "lens"
		| "contact_lens"
		| "contact_lens_with_accessory"
		| "accessory";
	frameColorName: string;
	powerType: TPowerType | null; // required for lens/contact-lens items, null for frame/accessory only
	submitType: TSubmitType | "";
	quantity: number;
	unitPrice: number; // Price at time of adding to cart
	subtotal: number; // quantity * unitPrice
}

export interface ICart extends Document {
	customerId: mongoose.Schema.Types.ObjectId;
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

const prescriptionSchema = new Schema<IPrescriptionSchema>(
	{
		sphere: { type: String },
		cylinder: { type: String },
		axis: { type: String },
		near: { type: String },
	},
	{ _id: false }
);

const CartItemSchema = new Schema<ICartItem>(
	{
		productId: { type: Schema.Types.ObjectId, ref: "Product" },
		lensId: { type: Schema.Types.ObjectId, ref: "Lens" },
		contactLensId: { type: Schema.Types.ObjectId, ref: "ContactLens" },
		accessoryId: { type: Schema.Types.ObjectId, ref: "Accessory" },
		prescriptionImg: { type: [String], default: [] },
		type: {
			type: String,
			enum: [
				"frame",
				"frame_with_lens",
				"lens",
				"contact_lens",
				"contact_lens_with_accessory",
				"accessory",
			],
			required: true,
		},
		frameColorName: {type:String, default: ""},
		powerType: {
			type: String,
			enum: ["with_power", "without_power", null],
			default: null,
		},
		submitType: {
			type: String,
			enum: ["add_power", "prescription_image", "submit_power_later", ""],
			default: "",
		},
		pd: { type: Number, default: 0 },
		leftEye: { type: prescriptionSchema },
		rightEye: { type: prescriptionSchema },
		quantity: { type: Number, required: true, min: 1 },
		unitPrice: { type: Number, required: true },
		subtotal: { type: Number, required: true },
	},
	{ _id: false }
);

const CartSchema = new Schema<ICart>(
	{
		customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
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
