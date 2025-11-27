import mongoose, { Document } from "mongoose";
export interface IPrescriptionSchema {
    sphere: string;
    cylinder: string;
    axis: string;
    near: string;
}
export interface ICartItem extends Document {
    productId?: mongoose.Schema.Types.ObjectId;
    lensId?: mongoose.Schema.Types.ObjectId;
    contactLensId?: mongoose.Schema.Types.ObjectId;
    accessoryId?: mongoose.Schema.Types.ObjectId;
    prescriptionImg?: String[];
    rightEye: IPrescriptionSchema;
    leftEye: IPrescriptionSchema;
    pd: number;
    type: "frame" | "frame_with_lens" | "lens" | "contact_lens" | "contact_lens_with_accessory" | "accessory";
    submitType: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}
export interface ICart extends Document {
    customerId: mongoose.Schema.Types.ObjectId;
    customerName: string;
    phoneNumber: string;
    email: string;
    address: string;
    items: ICartItem[];
    totalAmount: number;
    deliveryFee: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Cart: mongoose.Model<ICart, {}, {}, {}, mongoose.Document<unknown, {}, ICart, {}, {}> & ICart & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=cart.model.d.ts.map