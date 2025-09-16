// src/validations/registration.validation.ts
import { z } from "zod";

export const registrationSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters long")
		.max(50, "Name must be at most 50 characters long"),
	email: z.string().email("Invalid email address"),
	role: z.enum(["doctor", "employee"]),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long")
		.max(100, "Password must be at most 100 characters long"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
