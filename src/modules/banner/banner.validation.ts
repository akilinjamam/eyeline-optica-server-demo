import { z } from "zod";

export const bannerSchema = z.object({
	category: z.string().trim().min(1, "Category cannot be empty"),

	images: z.array(z.string().url("Invalid image URL")),
});

// ✅ Inferred Type (useful in controllers)
export type BannerInput = z.infer<typeof bannerSchema>;
