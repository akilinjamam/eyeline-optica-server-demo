import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const saleItemInputSchema = z.object({
	product: z.string({ error: "Product ID is required" }).regex(objectIdRegex, "Invalid product ID"),
	quantity: z.number({ error: "Quantity is required" }).positive("Quantity must be greater than 0"),
	sellingPrice: z.number({ error: "Selling price is required" }).min(0),
});

const createSaleValidationSchema = z.object({
	body: z.object({
		invoiceNo: z.string().trim().min(1).optional(),
		customer: z.string().regex(objectIdRegex, "Invalid customer ID").nullable().optional(),
		items: z.array(saleItemInputSchema).min(1, "At least one item is required for a sale"),
		discount: z.number().min(0).optional(),
		paidAmount: z.number({ error: "Paid amount is required" }).min(0),
		paymentMethod: z.enum(["cash", "bkash", "nagad", "bank", "card"]).optional(),
		saleDate: z.union([z.string(), z.date()]).optional(),
		note: z.string().trim().optional(),
	}),
});

const updateSalePaymentValidationSchema = z.object({
	body: z.object({
		paidAmount: z.number().min(0).optional(),
		paymentMethod: z.enum(["cash", "bkash", "nagad", "bank", "card"]).optional(),
		note: z.string().trim().optional(),
	}),
});

export const SaleValidations = {
	createSaleValidationSchema,
	updateSalePaymentValidationSchema,
};
