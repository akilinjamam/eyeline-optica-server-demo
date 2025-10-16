export type TPaymentHistory = {
    customerId: string;
    productId: string;
    lensId: string;
    contactLensId: string;
    payableAmount: number;
    quantity: number;
    dueAmount: number;
    deliveryFee: number;
    subtotal: number;
    status: "Order receieved" | "processsing" | "packaging" | "on the way" | "delivered";
};
//# sourceMappingURL=paymentHistory.type.d.ts.map