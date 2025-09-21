import mongoose, { Schema } from "mongoose";
import { IDoctor, IReview } from "./doctor.types";

const DoctorSchema: Schema<IDoctor> = new Schema(
	{
		name: { type: String, default: "add your name" },
		email: { type: String, required: true },
		specialities: { type: [String], default: "add your specialities like Cardiology, Neurology" },
		studies: { type: [String], default: "add your Studies like MBBS, FCPS, FRCS" },
		totalExperience: { type: Number, default: 0 },
		bmdcNumber: { type: String, unique: true, default: "add your bmdc number" },
		currentlyWorking: { type: String, default: "add where you work now" },
		description: { type: String, default: "write something about you" },
		experienceDetail: { type: String, default: "write your experience history" },
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
