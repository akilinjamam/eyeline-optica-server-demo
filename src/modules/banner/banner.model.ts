import { Schema, model, Document } from "mongoose";

// 1️⃣ Define the TypeScript interface
export interface IBanner extends Document {
	category: string;
	images: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

// 2️⃣ Create the Mongoose schema
const bannerSchema = new Schema<IBanner>(
	{
		category: {
			type: String,
			required: true,
			trim: true,
		},
		images: { type: [String], default: [] },
	},
	{
		timestamps: true,
	}
);

// 3️⃣ Create the Mongoose model
const Banner = model<IBanner>("Banner", bannerSchema);

export default Banner;
