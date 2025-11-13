"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerSchema = void 0;
const zod_1 = require("zod");
exports.bannerSchema = zod_1.z.object({
    category: zod_1.z.string().trim().min(1, "Category cannot be empty"),
    images: zod_1.z.array(zod_1.z.string().url("Invalid image URL")),
});
//# sourceMappingURL=banner.validation.js.map