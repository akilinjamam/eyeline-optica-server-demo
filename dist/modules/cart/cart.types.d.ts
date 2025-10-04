import mongoose from "mongoose";
export interface ICart {
    username: string;
    phone: number;
    address: string;
    profileId?: mongoose.Types.ObjectId;
    productId?: mongoose.Types.ObjectId;
    lensId?: mongoose.Types.ObjectId;
    quantity: number;
}
//# sourceMappingURL=cart.types.d.ts.map