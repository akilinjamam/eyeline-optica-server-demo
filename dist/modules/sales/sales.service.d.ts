import { ISalesItem } from "./sales.types";
export declare const salesService: {
    createSalesService: (payload: ISalesItem) => Promise<import("mongoose").Document<unknown, {}, ISalesItem, {}, {}> & ISalesItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllSalessService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, ISalesItem, {}, {}> & ISalesItem & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
};
//# sourceMappingURL=sales.service.d.ts.map