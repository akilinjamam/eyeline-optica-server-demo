import { Schema, model } from "mongoose";
import { IFcbCustomer } from "./customer.interface";

const customerSchema = new Schema<IFcbCustomer>(
	{
		name: { type: String, required: true, trim: true },
		phone: { type: String, required: true, trim: true, unique: true },
		email: { type: String, trim: true, lowercase: true },
		address: { type: String, trim: true },
		type: {
			type: String,
			enum: ["retail", "wholesale"],
			default: "retail",
		},
		totalDue: { type: Number, required: true, default: 0, min: 0 },
		note: { type: String, trim: true },
		isActive: { type: Boolean, default: true },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const FcbCustomer = model<IFcbCustomer>("FcbCustomer", customerSchema);
