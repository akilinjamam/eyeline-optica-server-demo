import { IAccessory } from "./accessory.model";
export declare const accessoryService: {
    createAccessoryService: (payload: IAccessory) => Promise<import("mongoose").Document<unknown, {}, IAccessory, {}, {}> & IAccessory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllAccessoryService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, IAccessory, {}, {}> & IAccessory & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    getSingleAccessoryService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IAccessory, {}, {}> & IAccessory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateAccessoryService: (id: string, payload: any) => Promise<import("mongoose").Document<unknown, {}, IAccessory, {}, {}> & IAccessory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteAccessoryService: (ids: string[]) => Promise<import("mongodb").DeleteResult>;
};
//# sourceMappingURL=accessory.service.d.ts.map