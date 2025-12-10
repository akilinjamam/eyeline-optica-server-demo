import { ILens } from "./lenses.types";
import mongoose from "mongoose";
export declare const lenseService: {
    createLenseService: (payload: ILens) => Promise<mongoose.Document<unknown, {}, ILens, {}, {}> & ILens & {
        _id: mongoose.Types.ObjectId;
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
        data: (mongoose.Document<unknown, {}, ILens, {}, {}> & ILens & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    updateLensService: (payload: any, id: string) => Promise<(mongoose.Document<unknown, {}, ILens, {}, {}> & ILens & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | undefined>;
    deleteLensService: (ids: string[]) => Promise<mongoose.mongo.DeleteResult>;
    getSingleLensService: (id: string) => Promise<(mongoose.Document<unknown, {}, ILens, {}, {}> & ILens & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=lenses.service.d.ts.map