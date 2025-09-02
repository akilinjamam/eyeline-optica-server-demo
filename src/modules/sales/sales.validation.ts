import { z } from "zod";

export const salesItemSchema = z.object({
	name: z.string().min(1, "Name is required"),
	category: z.string().min(1, "Category is required"),
	brand: z.string().optional(),
	barcode: z.string().optional(),
	price: z.number().min(0, "Price must be positive"),
	purchasePrice: z.number().min(0).optional(),
	quantity: z.number().int().min(1, "Quantity must be at least 1"),
	discount: z.number().min(0).max(100).optional(),
	total: z.number().min(0).optional(),
	tax: z.number().min(0).optional(),
	date: z.date(),

	// Lens-specific
	lensType: z.enum(["single vision", "bifocal", "progressive", "reading"]).optional(),
	material: z.enum(["plastic", "polycarbonate", "high-index", "glass"]).optional(),
	coatings: z.array(z.string()).optional(),
	prescriptionRange: z.string().optional(),
	index: z.number().optional(),
	thickness: z.string().optional(),
	color: z.string().optional(),
	diameter: z.number().optional(),

	// Product-specific
	materialsCategory: z.string().optional(),
	frameCategory: z.string().optional(),
	sizeCategory: z.string().optional(),
	shapeCategory: z.string().optional(),
	biologyCategory: z.string().optional(),
	features: z.array(z.string()).optional(),
	badge: z.string().optional(),
});

// Type inference for TypeScript
export type SalesItemInput = z.infer<typeof salesItemSchema>;
