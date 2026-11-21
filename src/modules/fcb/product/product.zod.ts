import { z } from "zod";

const createProductValidationSchema = z.object({
	body: z.object({
		name: z.string({ error: "Product name is required" }).trim().min(1),
		slug: z.string().trim().toLowerCase().optional(),
		sku: z.string({ error: "SKU is required" }).trim().min(1),
		category: z.string({ error: "Category is required" }).trim().min(1),
		images: z.array(z.string().trim()).optional(),
		purchasePrice: z.number({ error: "Purchase price is required" }).min(0),
		sellingPrice: z.number({ error: "Selling price is required" }).min(0),
		stockQuantity: z.number().min(0).optional(),
		lowStockAlert: z.number().min(0).optional(),
	}),
});

const updateProductValidationSchema = z.object({
	body: z.object({
		name: z.string().trim().min(1).optional(),
		slug: z.string().trim().toLowerCase().optional(),
		sku: z.string().trim().min(1).optional(),
		category: z.string().trim().min(1).optional(),
		unit: z.enum(["piece", "meter", "yard"]).optional(),
		images: z.array(z.string().trim()).optional(),
		purchasePrice: z.number().min(0).optional(),
		sellingPrice: z.number().min(0).optional(),
		stockQuantity: z.number().min(0).optional(),
		lowStockAlert: z.number().min(0).optional(),
	}),
});

export const ProductValidations = {
	createProductValidationSchema,
	updateProductValidationSchema,
};
