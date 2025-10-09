import { z } from "zod";

// 🎯 Each item in the sale/cart
export const cartItemSchema = z.object({
	type: z.enum(["frame", "frame_with_lens", "lens", "contact_lens", "accessory"]),
	productId: z.string().optional(),
	lensId: z.string().optional(),
	contactLensId: z.string().optional(),
	accessoryId: z.string().optional(),
	quantity: z.number().min(1, "Quantity must be at least 1"),
	unitPrice: z.number().min(0, "Unit price cannot be negative"),
	subtotal: z.number().min(0, "Subtotal cannot be negative"),
});

// 🧾 Main sale object validation
export const cartValidationSchema = z.object({
	customerName: z.string().min(1),
	phoneNumber: z.string().min(1),
	email: z.string().min(1),
	address: z.string().min(1),
	items: z
		.array(cartItemSchema)
		.min(1)
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
	totalAmount: z.number().min(0),
	deliveryFee: z.number().min(0),
});

export type CartInput = z.infer<typeof cartValidationSchema>;
