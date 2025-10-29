import { ICategory } from "./category.model";
export declare const CategoryService: {
    createCategoryService: (payload: ICategory) => Promise<import("mongoose").Document<unknown, {}, ICategory, {}, {}> & ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllCategoryService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, ICategory, {}, {}> & ICategory & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    getSingleCategoryService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ICategory, {}, {}> & ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateCategoryService: (payload: Record<string, unknown>, id: string) => Promise<import("mongoose").Document<unknown, {}, ICategory, {}, {}> & ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteCategoryService: (ids: string[]) => Promise<import("mongodb").DeleteResult>;
};
//# sourceMappingURL=category.service.d.ts.map