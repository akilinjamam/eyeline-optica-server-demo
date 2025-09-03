import { z } from "zod";
import mongoose from "mongoose";

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
	message: "Invalid ObjectId",
});

export const cartValidationSchema = z.object({
	username: z.string().min(1, "Username is required"),
	phone: z.number().int("Phone must be an integer").positive("Phone number must be positive"),
	address: z.string().min(1, "Address is required"),
	profileId: objectIdSchema.optional(),
	productId: objectIdSchema.optional(),
	lensId: objectIdSchema.optional(),
	quantity: z.number().int().positive("Quantity must be a positive integer"),
});

// Type for TypeScript
export type CartInput = z.infer<typeof cartValidationSchema>;
