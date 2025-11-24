import mongoose, { Document, Schema } from "mongoose";

export interface IWishList extends Document {
	frameId?: mongoose.Types.ObjectId;
	lensId?: mongoose.Types.ObjectId;
	contactLensId?: mongoose.Types.ObjectId;
	accessoryId?: mongoose.Types.ObjectId;
	clicked?: string;
}

const wishListSchema = new Schema<IWishList>(
	{
		frameId: { type: Schema.Types.ObjectId, ref: "Product", default: null },
		lensId: { type: Schema.Types.ObjectId, ref: "Lens", default: null },
		contactLensId: { type: Schema.Types.ObjectId, ref: "ContactLens", default: null },
		accessoryId: { type: Schema.Types.ObjectId, ref: "Accessory", default: null },
		clicked: { type: Number, default: 1 },
	},
	{
		timestamps: true,
	}
);

export const WishList = mongoose.model<IWishList>("WishList", wishListSchema);
