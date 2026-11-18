import mongoose, { Schema, model, Document, ObjectId } from "mongoose";

interface IMetaData {
	name: string;
	price: string;
}
interface IDevice {
	userAgent: string;
	ip: string;
}

interface IUser {
	name: string;
	phone: string;
	address: string;
}

// 1️⃣ Define the TypeScript interface
export interface ITrace extends Document {
	eventType: string;
	sessionId: string;
	productId: ObjectId;
	metaData: IMetaData;
	userInfo: IUser;
	deviceInfo: IDevice;
	createdAt?: Date;
	updatedAt?: Date;
}

// 2️⃣ Create the Mongoose schema
const traceSchema = new Schema<ITrace>(
	{
		eventType: {
			type: String,
			required: true,
			trim: true,
		},
		sessionId: {
			type: String,
			required: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			default: null,
		},
		metaData: {
			name: {
				type: String,
				trim: true,
				default: null,
			},
			price: {
				type: String,
				default: "0",
			},
		},
		deviceInfo: {
			userAgent: String,
			ip: String,
		},
		userInfo: {
			name: {
				type: String,
				default: null,
			},
			phone: {
				type: String,
				default: null,
			},
			address: {
				type: String,
				default: null,
			},
		},
	},
	{
		timestamps: true,
	}
);

traceSchema.index({ sessionId: 1, createdAt: -1 });
traceSchema.index({ eventType: 1, createdAt: -1 });

// 3️⃣ Create the Mongoose model
const Trace = model<ITrace>("Trace", traceSchema);

export default Trace;
