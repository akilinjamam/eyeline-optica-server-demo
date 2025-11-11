// validations/product.validation.ts
import { z } from "zod";

export const productSchema = z.object({
	name: z.string().min(1, "Name is required"),
	images: z.array(z.string().url()).optional(),
	type: z.string(),
	materialsCategory: z.string(),
	frameCategory: z.string(),
	sizeCategory: z.string(),
	shapeCategory: z.string(),
	biologyCategory: z.string(),
	color: z.string(),
	purchase: z.number().nonnegative(),
	salesPrice: z.number().nonnegative(),
	discount: z.number().min(0),
	quantity: z.number().int().nonnegative(),
	sold: z.number().int().nonnegative().optional(),
	features: z.array(z.string()).optional(),
	brand: z.string(),
	barcode: z.string(),
	badge: z.string().optional(),
	description: z.string(),
	weeklyDeals: z.boolean(),
	frameMeasurements: z.string().optional(),
	frameDetails: z.string().optional(),
	prescriptionDetails: z.string().optional(),
	reviews: z.array(z.any()).optional(),
	stock: z.boolean().default(true),
	frameWidth: z.string().default("Not-added"),
	bridge: z.string().default("Not-added"),
	lensWidth: z.string().default("Not-added"),
	lensHeight: z.string().default("Not-added"),
	templeLength: z.string().default("Not-added"),
	size: z.string().default("Not-added"),
	weight: z.string().default("Not-added"),
	pdRange: z.string().default("Not-added"),
	prescriptionRange: z.string().default("Not-added"),
	availableAsProBi: z.boolean().default(false),
	availableAsReader: z.boolean().default(false),

	otherImages: z
		.array(
			z.object({
				colorName: z.string().optional().default("Black"),
				fromColor: z.string().optional().default("#000000"),
				toColor: z.string().optional().default("#000000"),
				images: z.array(z.string().url()).optional(),
			})
		)
		.optional(),
});
