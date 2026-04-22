import { z } from "zod";

export const metaSchema = z.object({
	title: z.string().trim().min(1, "Category cannot be empty"),
	description: z.string().trim().min(1, "Description cannot be empty"),
});

// ✅ Inferred Type (useful in controllers)
export type MetaInput = z.infer<typeof metaSchema>;
