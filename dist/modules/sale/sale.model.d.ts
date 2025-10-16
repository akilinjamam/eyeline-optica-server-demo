import mongoose, { Document, Model } from "mongoose";
export interface ISale extends Document {
    quantity: number;
    invoiceNo: string;
    tran_id: string;
    customerId: mongoose.Types.ObjectId;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_email: string;
    payableAmount: number;
    dueAmount: number;
    productId: mongoose.Types.ObjectId;
    lensId: mongoose.Types.ObjectId;
    contactLensId: mongoose.Types.ObjectId;
    deliveryFee: number;
    subtotal: number;
    status: "pending" | "receieved" | "processsing" | "packaging" | "on the way" | "delivered";
}
export declare const Sale: Model<ISale>;
//# sourceMappingURL=sale.model.d.ts.map