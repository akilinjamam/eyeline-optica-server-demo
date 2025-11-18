import { Document, Types, Schema, model } from "mongoose";

export interface IPatient extends Document {
	name: string;
	phone: string;
	age: number;
	address: string;
	doctorId: Types.ObjectId;
	slotId: Types.ObjectId;
}

const PatientSchema = new Schema<IPatient>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		phone: {
			type: String,
			required: true,
			trim: true,
			minlength: 10,
		},

		age: {
			type: Number,
			required: true,
		},

		address: {
			type: String,
			required: true,
		},

		doctorId: {
			type: Schema.Types.ObjectId,
			ref: "Doctor",
			required: true,
		},

		slotId: {
			type: Schema.Types.ObjectId,
			ref: "Slot",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Patient = model<IPatient>("Patient", PatientSchema);
