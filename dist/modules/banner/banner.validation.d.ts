import { z } from "zod";
export declare const bannerSchema: z.ZodObject<{
    category: z.ZodString;
    images: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type BannerInput = z.infer<typeof bannerSchema>;
//# sourceMappingURL=banner.validation.d.ts.map