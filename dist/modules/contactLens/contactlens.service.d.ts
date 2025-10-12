import { IContactLens } from "./contactlens.type";
export declare const contactLensService: {
    createContactLensService: (payload: IContactLens) => Promise<import("mongoose").Document<unknown, {}, IContactLens, {}, {}> & IContactLens & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllContactLenseService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, IContactLens, {}, {}> & IContactLens & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    getSingleContactLensService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IContactLens, {}, {}> & IContactLens & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateContactLensService: (payload: Record<string, unknown>, id: string) => Promise<import("mongoose").Document<unknown, {}, IContactLens, {}, {}> & IContactLens & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteContactLensService: (ids: string[]) => Promise<import("mongodb").DeleteResult>;
};
//# sourceMappingURL=contactlens.service.d.ts.map