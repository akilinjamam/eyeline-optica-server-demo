import mongoose, { Document, Model } from "mongoose";
export interface IPaymentHistory extends Document {
    customerId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    lensId: mongoose.Types.ObjectId;
    contactLensId: mongoose.Types.ObjectId;
    accessoryId: mongoose.Types.ObjectId;
    payableAmount: number;
    quantity: number;
    dueAmount: number;
    deliveryFee: number;
    subtotal: number;
    status: "Order received" | "processsing" | "packaging" | "on the way" | "delivered";
    discountOn: string;
    dealsDiscount: number;
}
export declare const PaymentHistory: Model<IPaymentHistory>;
//# sourceMappingURL=paymentHistory.model.d.ts.map