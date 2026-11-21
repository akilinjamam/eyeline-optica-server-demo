import { z } from "zod";

const createFcbCustomerValidationSchema = z.object({
	body: z.object({
		name: z.string({ error: "Customer name is required" }).trim().min(1),
		phone: z.string({ error: "Phone number is required" }).trim().min(5),
		email: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
		address: z.string().trim().optional(),
		type: z.enum(["retail", "wholesale"]).optional(),
		totalDue: z.number().min(0).optional(),
		note: z.string().trim().optional(),
		isActive: z.boolean().optional(),
	}),
});

const updateFcbCustomerValidationSchema = z.object({
	body: z.object({
		name: z.string().trim().min(1).optional(),
		phone: z.string().trim().min(5).optional(),
		email: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
		address: z.string().trim().optional(),
		type: z.enum(["retail", "wholesale"]).optional(),
		totalDue: z.number().min(0).optional(),
		note: z.string().trim().optional(),
		isActive: z.boolean().optional(),
	}),
});

export const CustomerValidations = {
	createFcbCustomerValidationSchema,
	updateFcbCustomerValidationSchema,
};
