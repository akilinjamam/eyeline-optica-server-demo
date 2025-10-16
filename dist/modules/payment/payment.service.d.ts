import { TPaymentData } from "./payment.type";
export declare const paymentService: {
    createPaymentService: (payload: TPaymentData) => Promise<any>;
    paymentSuccessService: (salesId: string) => Promise<"success" | undefined>;
    paymentFailService: (saleId: string) => Promise<"saleData deleted" | undefined>;
    paymentCancelledService: (saleId: string) => Promise<"saleData deleted" | undefined>;
};
//# sourceMappingURL=payment.service.d.ts.map