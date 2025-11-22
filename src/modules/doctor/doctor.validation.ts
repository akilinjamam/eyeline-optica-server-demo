import { z } from "zod";
export const DoctorSchemaZod = z.object({
	name: z.string().optional(),
	email: z.email(),
	specialities: z.array(z.string()).optional(),
	studies: z.array(z.string()).optional(),
	totalExperience: z.number().optional(),
	bmdcNumber: z.string().optional(),
	ratings: z.number().min(0).optional(),
	currentlyWorking: z.string().optional(),
	description: z.string().optional(),
	experienceDetail: z.string().optional(),
	clinicName: z.string().optional(),
	clinicAddress: z.string().optional(),
	phone: z.string().optional(),
	images: z.array(z.string().url()).optional(),
	appointmentFee: z.number().min(0).optional(),
});

export const ReviewSchemaZod = z.object({
	doctor: z.string().min(1, "Doctor ID is required"), // expecting ObjectId as string
	reviewerName: z.string().min(1, "Reviewer name is required"),
	comment: z.string().min(1, "Comment is required"),
	rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
	date: z.preprocess((arg) => (arg ? new Date(arg as string) : new Date()), z.date()).optional(),
});

// TypeScript type inferred from Zod schema
export type ReviewInput = z.infer<typeof ReviewSchemaZod>;

// TypeScript type inferred from Zod schema
export type DoctorInput = z.infer<typeof DoctorSchemaZod>;
