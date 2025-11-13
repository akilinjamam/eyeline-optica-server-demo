import { IBanner } from "./banner.model";
export declare const BannerService: {
    createBannerService: (payload: IBanner) => Promise<import("mongoose").Document<unknown, {}, IBanner, {}, {}> & IBanner & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllBannerService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, IBanner, {}, {}> & IBanner & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    updateBannerService: (payload: Record<string, unknown>, id: string) => Promise<import("mongoose").Document<unknown, {}, IBanner, {}, {}> & IBanner & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteBannerService: (ids: string[]) => Promise<import("mongodb").DeleteResult>;
    getSingleBannerService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IBanner, {}, {}> & IBanner & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=banner.service.d.ts.map