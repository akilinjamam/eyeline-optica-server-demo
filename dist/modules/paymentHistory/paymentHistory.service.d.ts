export declare const paymentHistoryService: {
    getPaymentHistoryService: (cus_id: string, query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, import("./paymentHistory.model").IPaymentHistory, {}, {}> & import("./paymentHistory.model").IPaymentHistory & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    getSinglePaymentHistoryService: (payment_his_id: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./paymentHistory.model").IPaymentHistory, {}, {}> & import("./paymentHistory.model").IPaymentHistory & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
};
//# sourceMappingURL=paymentHistory.service.d.ts.map