export declare const salesService: {
    getSaleService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, import("./sale.model").ISale, {}, {}> & import("./sale.model").ISale & Required<{
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
        data: (import("mongoose").Document<unknown, {}, import("../customer/customer.type").TCustomer, {}, {}> & import("../customer/customer.type").TCustomer & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
};
//# sourceMappingURL=sale.service.d.ts.map