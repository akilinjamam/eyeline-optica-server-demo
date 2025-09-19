import { model, Schema } from "mongoose";
import { IRegistration } from "./registration.type";
import bcrypt from "bcrypt";

const registrationSchema = new Schema<IRegistration>(
	{
		name: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 50,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true, // email must be unique
			lowercase: true,
			trim: true,
		},
		role: {
			type: String,
			enum: ["doctor", "employee", "admin"],
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		access: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true, // adds createdAt and updatedAt
	}
);

registrationSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

registrationSchema.methods.comparePassword = async function (candidatePassword: string) {
	return await bcrypt.compare(candidatePassword, this.password);
};

// --- Create Model
export const RegistrationModel = model<IRegistration>("Registration", registrationSchema);
