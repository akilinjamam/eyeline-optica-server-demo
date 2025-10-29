import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
	categoryType: string;
	category: string;
}

const categorySchema = new Schema<ICategory>(
	{
		categoryType: { type: String, required: true },
		category: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
