import { Schema, model, Document } from "mongoose";

// 1️⃣ Define the TypeScript interface
export interface IMeta extends Document {
	title: string;
	description: string;
	routeName: string;
	createdAt?: Date;
	updatedAt?: Date;
}

// 2️⃣ Create the Mongoose schema
const metaSchema = new Schema<IMeta>(
	{
		title: {
			type: String,
			trim: true,
			default: "blank",
		},
		routeName: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
			default: "blank",
		},
	},
	{
		timestamps: true,
	}
);

// 3️⃣ Create the Mongoose model
const Meta = model<IMeta>("Meta", metaSchema);

export default Meta;
