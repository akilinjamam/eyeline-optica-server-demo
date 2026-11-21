import { z } from "zod";

const createSupplierValidationSchema = z.object({
	body: z.object({
		name: z.string({ error: "Supplier name is required" }).trim().min(1),
		companyName: z.string().trim().optional(),
		phone: z.string({ error: "Phone number is required" }).trim().min(5),
		email: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
		address: z.string().trim().optional(),
		totalDue: z.number().min(0).optional(),
		isActive: z.boolean().optional(),
	}),
});

const updateSupplierValidationSchema = z.object({
	body: z.object({
		name: z.string().trim().min(1).optional(),
		companyName: z.string().trim().optional(),
		phone: z.string().trim().min(5).optional(),
		email: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
		address: z.string().trim().optional(),
		totalDue: z.number().min(0).optional(),
		isActive: z.boolean().optional(),
	}),
});

export const SupplierValidations = {
	createSupplierValidationSchema,
	updateSupplierValidationSchema,
};
