import { z } from "zod";

export const MedicineSchema = z.object({
	name: z.string().min(1, "Medicine name is required"),
	dosage: z.string().min(1, "Dosage is required"),
	frequency: z.string().min(1, "Frequency is required"),
	duration: z.string().min(1, "Duration is required"),
});

export const PrescriptionSchema = z.object({
	doctorId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid doctorId"),
	patientId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid patientId"),
	date: z.string().min(1, "Date is required"),
	diagnosis: z.string().min(1, "Diagnosis is required"),
	medicines: z.array(MedicineSchema).nonempty("At least one medicine is required"),
	tests: z.string().min(1, "Tests field is required"),
	advice: z.string().min(1, "Advice is required"),
});

export type PrescriptionInput = z.infer<typeof PrescriptionSchema>;
