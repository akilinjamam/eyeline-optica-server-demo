import mongoose, { Document } from "mongoose";
export interface IWishList extends Document {
    frameId?: mongoose.Types.ObjectId;
    lensId?: mongoose.Types.ObjectId;
    contactLensId?: mongoose.Types.ObjectId;
    accessoryId?: mongoose.Types.ObjectId;
    clicked?: string;
}
export declare const WishList: mongoose.Model<IWishList, {}, {}, {}, mongoose.Document<unknown, {}, IWishList, {}, {}> & IWishList & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=wishlist.model.d.ts.map