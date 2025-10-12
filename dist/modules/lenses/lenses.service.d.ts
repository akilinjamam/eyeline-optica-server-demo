import { ILens } from "./lenses.types";
export declare const lenseService: {
    createLenseService: (payload: ILens) => Promise<import("mongoose").Document<unknown, {}, ILens, {}, {}> & ILens & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllLenseService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, ILens, {}, {}> & ILens & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    updateLensService: (payload: Record<string, unknown>, id: string) => Promise<import("mongoose").Document<unknown, {}, ILens, {}, {}> & ILens & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteLensService: (ids: string[]) => Promise<import("mongodb").DeleteResult>;
    getSingleLensService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ILens, {}, {}> & ILens & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=lenses.service.d.ts.map