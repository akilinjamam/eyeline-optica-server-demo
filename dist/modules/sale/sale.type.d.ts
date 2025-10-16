import mongoose from "mongoose";
export type TSale = {
    invoiceNo: string;
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
    status: "pending" | "Order receieved" | "processsing" | "packaging" | "on the way" | "delivered";
};
//# sourceMappingURL=sale.type.d.ts.map