import { IProduct } from "./products.types";
export declare const productService: {
    createProductService: (payload: IProduct) => Promise<import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllProductsService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    updateProductService: (payload: Record<string, unknown>, id: string) => Promise<import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteProductService: (ids: string[]) => Promise<import("mongodb").DeleteResult>;
    getSingleProductService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IProduct, {}, {}> & IProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=products.service.d.ts.map