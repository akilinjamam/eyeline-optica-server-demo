import { z } from "zod";

export const contactLensSchema = z.object({
	name: z.string().min(1, "Name is required"),
	brand: z.string().min(1, "Brand is required"),
	color: z.string().min(1, "Color is required"),

	type: z
		.enum(["daily disposable", "monthly", "monthly (colored)", "weekly", "toric", "multifocal"])
		.or(z.string().min(1)), // extendable
	powerType: z.enum(["with power", "without power"]).or(z.string().min(1)),

	material: z.string().min(1, "Material is required"),
	waterContent: z.string(),

	diameter: z.number(), // realistic range
	baseCurve: z.number(),

	powerRange: z.string(),
	uvProtection: z.boolean().default(false),

	purchasePrice: z.number().min(0, "Purchase price must be >= 0"),
	salesPrice: z.number().min(0, "Sales price must be >= 0"),
	stock: z.boolean().default(true),
	quantity: z.number().min(1, "Quantity must be at least 1"),
	sold: z.number().default(0),
	offer: z.number().min(0).max(100).optional().default(0),
	rating: z.number().min(0).max(5).default(0),
	barcode: z.string().optional().default("not-added"),
	features: z.array(z.string()).optional(),
	description: z.string().optional(),
	images: z.array(z.string().url("Must be a valid URL")).optional().default([]),
	weeklyDeals: z.boolean().default(false),
	badge: z.string().default("premium"),
});

// For creating new ContactLens
export const createContactLensSchema = contactLensSchema;

// For updating (all fields optional)
export const updateContactLensSchema = contactLensSchema.partial();
