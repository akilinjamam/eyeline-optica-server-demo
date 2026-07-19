import { z } from "zod";

// 👁️ Prescription schema
const prescriptionSchema = z.object({
	sphere: z.string().optional(),
	cylinder: z.string().optional(),
	axis: z.string().optional(),
	near: z.string().optional(),
});

// item types that involve a lens/contact-lens and therefore need a power choice
const POWERED_TYPES = [
	"frame_with_lens",
	"lens",
	"contact_lens",
	"contact_lens_with_accessory",
] as const;

const hasEyeValues = (eye?: z.infer<typeof prescriptionSchema>) =>
	!!eye && [eye.sphere, eye.cylinder, eye.axis, eye.near].some((v) => v && v.trim() !== "");

// 🛒 Each item in the cart
export const cartItemSchema = z.object({
	type: z.enum([
		"frame",
		"frame_with_lens",
		"lens",
		"contact_lens",
		"contact_lens_with_accessory",
		"accessory",
	]),
	frameColorName: z.string().optional(),
	powerType: z.enum(["with_power", "without_power"]).nullable().optional(),
	submitType: z
		.enum(["add_power", "prescription_image", "submit_power_later"])
		.or(z.literal(""))
		.optional(),
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

type TCartItemInput = z.infer<typeof cartItemSchema>;

/**
 * Power decision tree, applied per item:
 * - lens / contact-lens items must choose powerType: with_power | without_power
 * - with_power must choose submitType: add_power | prescription_image | submit_power_later
 *   - add_power           → left/right eye power values required
 *   - prescription_image  → prescription images required
 *   - submit_power_later  → nothing more required
 * - frame / accessory only items must not carry with_power
 *
 * `imagesUploadedSeparately` is true for the multipart route, where images are
 * merged into the payload as a top-level `prescriptionImg` by middleware.
 */
const validatePowerRules = (
	item: TCartItemInput,
	ctx: z.RefinementCtx,
	index: number,
	imagesUploadedSeparately: boolean
) => {
	const needsPowerChoice = (POWERED_TYPES as readonly string[]).includes(item.type);

	if (!needsPowerChoice) {
		if (item.powerType === "with_power") {
			ctx.addIssue({
				code: "custom",
				path: ["items", index, "powerType"],
				message: `Power options are not applicable for '${item.type}' items`,
			});
		}
		return;
	}

	if (!item.powerType) {
		ctx.addIssue({
			code: "custom",
			path: ["items", index, "powerType"],
			message: `Please choose 'with_power' or 'without_power' for '${item.type}' items`,
		});
		return;
	}

	if (item.powerType === "without_power") return;

	// with_power
	if (!item.submitType) {
		ctx.addIssue({
			code: "custom",
			path: ["items", index, "submitType"],
			message:
				"Please choose how to provide power: 'add_power', 'prescription_image' or 'submit_power_later'",
		});
		return;
	}

	if (item.submitType === "add_power") {
		if (!hasEyeValues(item.leftEye) && !hasEyeValues(item.rightEye)) {
			ctx.addIssue({
				code: "custom",
				path: ["items", index, "leftEye"],
				message: "Eye power values (leftEye/rightEye) are required when submitType is 'add_power'",
			});
		}
	}

	if (
		item.submitType === "prescription_image" &&
		!imagesUploadedSeparately &&
		(!item.prescriptionImg || item.prescriptionImg.length === 0)
	) {
		ctx.addIssue({
			code: "custom",
			path: ["items", index, "prescriptionImg"],
			message:
				"Prescription images are required when submitType is 'prescription_image' (use the create-cart-with-prescription endpoint to upload them)",
		});
	}
};

const itemsSchema = z
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
					case "contact_lens_with_accessory":
						return !!item.contactLensId && !!item.accessoryId;
					case "accessory":
						return !!item.accessoryId;
					default:
						return false;
				}
			}),
		{
			message: "Each item must include the correct references for its type",
		}
	);

const baseCartSchema = z.object({
	customerName: z.string().min(1, "Customer name is required"),
	phoneNumber: z.string().min(1, "Phone number is required"),
	email: z.string().optional().default(""),
	address: z.string().optional().default(""),
	items: itemsSchema,
	totalAmount: z.number().min(0, "Total amount cannot be negative"),
	deliveryFee: z.number().min(0, "Delivery fee cannot be negative"),
});

// 🧾 Main cart validation (JSON route: /create-cart)
export const cartValidationSchema = baseCartSchema.superRefine((cart, ctx) => {
	cart.items.forEach((item, index) => validatePowerRules(item, ctx, index, false));
});

// 🧾 Multipart route (/create-cart-with-prescription): images arrive at the top
// level via the image-combining middleware and are merged into items[0] by the service
export const cartWithPrescriptionValidationSchema = baseCartSchema
	.extend({
		prescriptionImg: z
			.array(z.string())
			.min(1, "At least one prescription image is required"),
	})
	.superRefine((cart, ctx) => {
		cart.items.forEach((item, index) => validatePowerRules(item, ctx, index, true));
	});

export type CartInput = z.infer<typeof cartValidationSchema>;
