import { z } from "zod";

export const blogImgSchema = z.object({
	url: z.any(),
	isStored: z.boolean().optional(),
});

// ✅ Inferred Type (useful in controllers)
export type BlogImgInput = z.infer<typeof blogImgSchema>;
