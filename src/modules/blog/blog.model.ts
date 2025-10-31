import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
	title: string;
	images: string;
	category: string;
	description: string;
}

const blogSchema = new Schema<IBlog>(
	{
		title: { type: String, required: true },
		category: { type: String, required: true },
		images: { type: String, required: true },
		description: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
