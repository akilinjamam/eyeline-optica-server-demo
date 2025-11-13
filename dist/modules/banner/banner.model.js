"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2️⃣ Create the Mongoose schema
const bannerSchema = new mongoose_1.Schema({
    category: {
        type: String,
        required: true,
        trim: true,
    },
    images: { type: [String], default: [] },
}, {
    timestamps: true,
});
// 3️⃣ Create the Mongoose model
const Banner = (0, mongoose_1.model)("Banner", bannerSchema);
exports.default = Banner;
//# sourceMappingURL=banner.model.js.map