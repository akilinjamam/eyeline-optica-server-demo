import { Schema, model, Document } from "mongoose";

// 1️⃣ Define the TypeScript interface
export interface IBlogImg extends Document {
	url: string;
	isStored: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

// 2️⃣ Create the Mongoose schema
const blogImgSchema = new Schema<IBlogImg>(
	{
		url: {
			type: String,
			required: true,
			trim: true,
		},
		isStored: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// 3️⃣ Create the Mongoose model
const BlogImg = model<IBlogImg>("BlogImg", blogImgSchema);

export default BlogImg;
