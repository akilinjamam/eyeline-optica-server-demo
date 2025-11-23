import { z } from "zod";

// const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
// 	message: "Invalid customer ID",
// });

// ✅ Schema for individual accessory items
export const accessoryItemSchema = z.object({
	name: z.string().min(1, "Name is required"),
	barcode: z.string().default("not-added"),
	brand: z.string().min(1, "Brand is required"),
	category: z.string().min(1, "Category is required"),
	quantity: z.number().min(0, "Quantity must be 0 or greater"),
	stock: z.boolean().default(true),
	purchasePrice: z.number().min(0, "Purchase price must be 0 or greater"),
	salesPrice: z.number().min(0, "Sales price must be 0 or greater"),
	discount: z.number().min(0, "Discount cannot be negative").default(0),
	sold: z.number().min(0, "Sold count must be 0 or greater").default(0),
	measurement: z.string().min(1, "Measurement is required"),
	description: z.string().default("not-added"),
});

// ✅ Schema for main accessory
export const accessorySchema = z.object({
	images: z.array(z.string()).default([]),
	type: z
		.enum([
			"With Solution",
			"With Bag",
			"With Kit",
			"With Solution + Kit",
			"With Solution + Bag",
			"With Kit + Bag",
			"With Solution + Bag + Kit",
			"others",
		])
		.default("others"),
	weeklyDeals: z.boolean().default(false),
	rating: z.number().min(0).max(5).default(0),
	items: z.array(accessoryItemSchema).min(1, "At least one item is required"),
});

// ✅ Type inference for usage
export type AccessoryInput = z.infer<typeof accessorySchema>;
export type AccessoryItemInput = z.infer<typeof accessoryItemSchema>;
