import mongoose, { Schema } from "mongoose";
import { IDoctor, IReview } from "./doctor.types";

const DoctorSchema: Schema<IDoctor> = new Schema(
	{
		name: { type: String, required: true },
		specialities: { type: [String], required: true },
		studies: { type: [String], required: true },
		totalExperience: { type: Number, required: true },
		bmdcNumber: { type: String, unique: true, required: true },
		currentlyWorking: { type: String },
		description: { type: String },
		experienceDetail: { type: String },
		images: { type: [String], default: [] }, // e.g. Cloudinary/S3 URLs
	},
	{ timestamps: true }
);

const ReviewSchema: Schema<IReview> = new Schema(
	{
		doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true }, // FK
		reviewerName: { type: String, required: true },
		comment: { type: String, required: true },
		rating: { type: Number, min: 1, max: 5, required: true },
		date: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

export const Review = mongoose.model("Review", ReviewSchema);

export const Doctor = mongoose.model("Doctor", DoctorSchema);
