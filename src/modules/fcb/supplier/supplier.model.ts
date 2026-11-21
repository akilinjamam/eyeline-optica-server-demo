import { Schema, model } from "mongoose";
import { IFcbSupplier } from "./supplier.interface";

const supplierSchema = new Schema<IFcbSupplier>(
	{
		name: { type: String, required: true, trim: true },
		companyName: { type: String, trim: true },
		phone: { type: String, required: true, trim: true, unique: true },
		email: { type: String, trim: true, lowercase: true },
		address: { type: String, trim: true },
		totalDue: { type: Number, required: true, default: 0, min: 0 },
		isActive: { type: Boolean, default: true },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const FcbSupplier = model<IFcbSupplier>("FcbSupplier", supplierSchema);
