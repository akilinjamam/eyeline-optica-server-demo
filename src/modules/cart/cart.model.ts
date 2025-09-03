import { model, Schema } from "mongoose";
import { ICart } from "./cart.types";

const CartSchema = new Schema<ICart>(
	{
		username: { type: String, default: "unknown" },
		phone: { type: Number, required: true },
		address: { type: String, dafault: "not given" },
		profileId: { type: Schema.Types.ObjectId, ref: "Profile" },
		productId: { type: Schema.Types.ObjectId, ref: "Product" },
		lensId: { type: Schema.Types.ObjectId, ref: "Lens" },
		quantity: { type: Number, required: true, default: 1 },
	},
	{ timestamps: true }
);

export const Cart = model<ICart>("Cart", CartSchema);
