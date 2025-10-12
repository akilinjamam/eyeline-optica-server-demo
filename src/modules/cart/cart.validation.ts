import { z } from "zod";

// 👁️ Prescription schema
const prescriptionSchema = z.object({
	sphere: z.string().optional(),
	cylinder: z.string().optional(),
	axis: z.string().optional(),
});

// 🛒 Each item in the cart
export const cartItemSchema = z.object({
	type: z.enum(["frame", "frame_with_lens", "lens", "contact_lens", "accessory"]),
	submitType: z.string().optional(),
	productId: z.string().optional(),
	lensId: z.string().optional(),
	contactLensId: z.string().optional(),
	accessoryId: z.string().optional(),
	prescriptionImg: z.array(z.string()).optional().default([]),
	pd: z.number().optional().default(0),
	rightEye: prescriptionSchema.optional(),
	leftEye: prescriptionSchema.optional(),
	quantity: z.number().min(1, "Quantity must be at least 1"),
	unitPrice: z.number().min(0, "Unit price cannot be negative"),
	subtotal: z.number().min(0, "Subtotal cannot be negative"),
});

// 🧾 Main cart validation
export const cartValidationSchema = z.object({
	customerName: z.string().min(1, "Customer name is required"),
	phoneNumber: z.string().min(1, "Phone number is required"),
	email: z.string().optional().default(""),
	address: z.string().optional().default(""),
	items: z
		.array(cartItemSchema)
		.min(1, "Cart must contain at least one item")
		.refine(
			(items) =>
				items.every((item) => {
					switch (item.type) {
						case "frame":
							return !!item.productId;
						case "frame_with_lens":
							return !!item.productId && !!item.lensId;
						case "lens":
							return !!item.lensId;
						case "contact_lens":
							return !!item.contactLensId;
						case "accessory":
							return !!item.accessoryId;
						default:
							return false;
					}
				}),
			{
				message: "Each item must include the correct references for its type",
			}
		),
	totalAmount: z.number().min(0, "Total amount cannot be negative"),
	deliveryFee: z.number().min(0, "Delivery fee cannot be negative"),
});

export type CartInput = z.infer<typeof cartValidationSchema>;
