import mongoose from "mongoose";
export declare const salesService: {
    getSaleService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (mongoose.Document<unknown, {}, import("./sale.model").ISale, {}, {}> & import("./sale.model").ISale & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    getCustomerService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (mongoose.Document<unknown, {}, import("../customer/customer.type").TCustomer, {}, {}> & import("../customer/customer.type").TCustomer & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    updateStatusService: (id: string, payload: {
        paymentHistoryId: string;
        status: string;
    }) => Promise<void>;
};
//# sourceMappingURL=sale.service.d.ts.map