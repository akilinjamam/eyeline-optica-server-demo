import { z } from "zod";

export const contactLensSchema = z.object({
	name: z.string().min(1, "Name is required"),
	brand: z.string().min(1, "Brand is required"),
	color: z.string().min(1, "Color is required"),

	type: z.enum(["daily disposable", "monthly", "monthly (colored)"]).or(z.string().min(1)), // extendable

	material: z.string().min(1, "Material is required"),
	waterContent: z.string().regex(/^\d+%$/, "Water content must be like '38%'"),

	diameter: z.number().min(10, "Diameter too small").max(20, "Diameter too large"), // realistic range
	baseCurve: z.number().min(7, "Base curve too small").max(10, "Base curve too large"),

	powerRange: z.string().min(1, "Power range required"),
	uvProtection: z.boolean().default(false),

	purchasePrice: z.number().min(0, "Purchase price must be >= 0"),
	salesPrice: z.number().min(0, "Sales price must be >= 0"),
	stock: z.number().int().min(0).default(0),

	offer: z.number().min(0).max(100).default(0),
	rating: z.number().min(0).max(5).default(0),

	features: z.array(z.string()).optional(),
	description: z.string().optional(),
	images: z.array(z.string().url("Must be a valid URL")).optional().default([]),
});

// For creating new ContactLens
export const createContactLensSchema = contactLensSchema;

// For updating (all fields optional)
export const updateContactLensSchema = contactLensSchema.partial();
