import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
	title: string;
	metaTitle: string;
	images: string[];
	category: string;
	description: string;
	metaDescription: string;
	slug: string;
}

const blogSchema = new Schema<IBlog>(
	{
		title: { type: String, required: true },
		metaTitle: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		category: { type: String, required: true },
		images: { type: [String], default: [] },
		description: { type: String, required: true },
		metaDescription: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
