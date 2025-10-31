import { z } from "zod";

export const lensValidationSchema = z.object({
	name: z.string().min(1, "Lens name is required"),
	description: z.string().optional(),
	purchasePrice: z.number().min(0, "Price must be a positive number"),
	salesPrice: z.number().min(0, "Price must be a positive number"),
	discount: z.number().optional().default(0),
	barcode: z.string().optional().default("not-added"),
	stock: z.boolean().default(true),
	quantity: z.number().min(1, "Quantity must be at least 1"),
	category: z.string().default("lens"),
	brand: z.string().optional(),
	images: z.array(z.string().url("Invalid image URL")).optional(),
	sold: z.number().default(0),
	lensType: z.enum(["single vision", "bifocal", "progressive", "reading", "zero power"]),
	material: z.enum(["plastic", "polycarbonate", "high-index", "glass"]),
	coatings: z.array(z.string()).optional(),
	prescriptionRange: z.string().optional(), // "+6.00 to -6.00"
	index: z.number().optional(), // 1.5, 1.6, 1.67, etc.
	thickness: z.string().optional(),
	color: z.string().optional(),
	diameter: z.number().optional(),

	warranty: z.string().optional(),
	deliveryTime: z.string().optional(),
	offer: z.number().min(0).max(100).default(0), // discount %
	rating: z.number().min(0).max(5).optional(),
	badge: z.string(),
});

// Type inference for TypeScript
export type LensInput = z.infer<typeof lensValidationSchema>;
