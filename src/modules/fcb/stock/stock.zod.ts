import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const createStockValidationSchema = z.object({
	body: z.object({
		productId: z
			.string({ error: "Product ID is required" })
			.regex(objectIdRegex, "Invalid product ID"),
		supplierId: z.string().regex(objectIdRegex, "Invalid supplier ID").nullable().optional(),
		batchCode: z.string().trim().optional(),
		purchasePrice: z.number({ error: "Purchase price is required" }).min(0),
		salesPrice: z.number({ error: "Sales price is required" }).min(0),
		quantity: z
			.number({ error: "Quantity is required" })
			.positive("Quantity must be greater than 0"),
		lowStockAlert: z.number().min(0).optional(),
		note: z.string().trim().optional(),
	}),
});

const updateStockValidationSchema = z.object({
	body: z.object({
		supplierId: z.string().regex(objectIdRegex, "Invalid supplier ID").nullable().optional(),
		batchCode: z.string().trim().optional(),
		purchasePrice: z.number().min(0).optional(),
		salesPrice: z.number().min(0).optional(),
		quantity: z.number().min(0).optional(),
		remainingQuantity: z.number().min(0).optional(),
		lowStockAlert: z.number().min(0).optional(),
		note: z.string().trim().optional(),
	}),
});

export const StockValidations = {
	createStockValidationSchema,
	updateStockValidationSchema,
};
