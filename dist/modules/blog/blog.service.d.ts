import { IBlog } from "./blog.model";
export declare const BlogService: {
    createBlogService: (payload: IBlog) => Promise<import("mongoose").Document<unknown, {}, IBlog, {}, {}> & IBlog & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllBlogService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, IBlog, {}, {}> & IBlog & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    getSingleBlogService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IBlog, {}, {}> & IBlog & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateBlogService: (payload: Record<string, unknown>, id: string) => Promise<import("mongoose").Document<unknown, {}, IBlog, {}, {}> & IBlog & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteBlogService: (ids: string[]) => Promise<import("mongodb").DeleteResult>;
};
//# sourceMappingURL=blog.service.d.ts.map