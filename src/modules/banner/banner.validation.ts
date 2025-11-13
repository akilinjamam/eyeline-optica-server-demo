import { z } from "zod";

export const bannerSchema = z.object({
	category: z.string().trim().min(1, "Category cannot be empty"),

	images: z.array(z.string()).nonempty("At least one image is required now"),
});

// ✅ Inferred Type (useful in controllers)
export type BannerInput = z.infer<typeof bannerSchema>;
