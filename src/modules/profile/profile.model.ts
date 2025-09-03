import mongoose, { Schema } from "mongoose";
import { IProfile } from "./profile.type";

const ProfileSchema = new Schema<IProfile>(
	{
		username: { type: String, required: true },
		phone: { type: Number, required: true },
		address: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);
