"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    username: { type: String, default: "unknown" },
    phone: { type: Number, required: true },
    address: { type: String, dafault: "not given" },
    profileId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Profile" },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product" },
    lensId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Lens" },
    quantity: { type: Number, required: true, default: 1 },
}, { timestamps: true });
exports.Cart = (0, mongoose_1.model)("Cart", CartSchema);
//# sourceMappingURL=cart.model.js.map