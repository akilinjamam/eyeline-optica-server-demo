import mongoose, { Schema, Document, Model } from "mongoose";

type Medicine = {
	name: string;
	dosage: string;
	frequency: string;
	duration: string;
};

export interface IPrescription extends Document {
	doctorId: mongoose.Types.ObjectId;
	patientId: mongoose.Types.ObjectId;
	date: string;
	diagnosis: string;
	medicines: Medicine[];
	tests: string;
	advice: string;
}

const MedicineSchema = new Schema<Medicine>(
	{
		name: { type: String, required: true },
		dosage: { type: String, required: true },
		frequency: { type: String, required: true },
		duration: { type: String, required: true },
	},
	{ _id: false }
);

const PrescriptionSchema = new Schema<IPrescription>(
	{
		doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
		patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
		date: { type: String, required: true },
		diagnosis: { type: String, required: true },
		medicines: { type: [MedicineSchema], required: true },
		tests: { type: String, required: true },
		advice: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Prescription: Model<IPrescription> =
	mongoose.models.Prescription || mongoose.model<IPrescription>("Prescription", PrescriptionSchema);
