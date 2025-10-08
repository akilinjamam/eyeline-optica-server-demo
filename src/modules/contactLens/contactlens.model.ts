import mongoose, { Schema } from "mongoose";
import { IContactLens } from "./contactlens.type";

const ContactLensSchema: Schema<IContactLens> = new Schema(
	{
		name: { type: String, required: true, trim: true },
		brand: { type: String, required: true, trim: true },
		color: { type: String, required: true, trim: true },
		type: {
			type: String,
			enum: ["daily disposable", "weekly", "monthly", "monthly (colored)", "toric", "multifocal"],
			default: "daily disposable",
		},
		material: { type: String, required: true },
		waterContent: { type: String, required: true }, // e.g. "38%"
		diameter: { type: Number, required: true },
		baseCurve: { type: Number, required: true },
		powerRange: { type: String, required: true },
		features: [{ type: String }],
		uvProtection: { type: Boolean, default: false },
		purchasePrice: { type: Number, required: true },
		salesPrice: { type: Number, required: true },
		stock: { type: Number, default: 0 },
		offer: { type: Number, min: 0, max: 100, default: 0 },
		rating: { type: Number, min: 0, max: 5, default: 0 },
		description: { type: String },
		images: [{ type: String }],
	},
	{ timestamps: true }
);

const ContactLens = mongoose.model<IContactLens>("ContactLens", ContactLensSchema);
export default ContactLens;
