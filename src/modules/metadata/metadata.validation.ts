import { z } from "zod";

export const metaSchema = z.object({
	title: z.string().trim().optional(),
	description: z.string().trim().optional(),
	routeName: z.string().trim().min(1, "routeName can not be empty"),
});

// ✅ Inferred Type (useful in controllers)
export type MetaInput = z.infer<typeof metaSchema>;
