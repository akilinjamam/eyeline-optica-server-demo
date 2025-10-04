import { IDoctor } from "./doctor.types";
export declare const createDoctorService: (payload: IDoctor) => Promise<import("mongoose").Document<unknown, {}, IDoctor, {}, import("mongoose").DefaultSchemaOptions> & IDoctor & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const getSingleDoctorService: (email: string) => Promise<(import("mongoose").Document<unknown, {}, IDoctor, {}, import("mongoose").DefaultSchemaOptions> & IDoctor & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}) | null>;
export declare const getAllDoctorService: (query: Record<string, unknown>) => Promise<{
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: (import("mongoose").Document<unknown, {}, IDoctor, {}, import("mongoose").DefaultSchemaOptions> & IDoctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[];
}>;
export declare const doctorServices: {
    createDoctorService: (payload: IDoctor) => Promise<import("mongoose").Document<unknown, {}, IDoctor, {}, import("mongoose").DefaultSchemaOptions> & IDoctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getSingleDoctorService: (email: string) => Promise<(import("mongoose").Document<unknown, {}, IDoctor, {}, import("mongoose").DefaultSchemaOptions> & IDoctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getAllDoctorService: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, IDoctor, {}, import("mongoose").DefaultSchemaOptions> & IDoctor & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    updateDoctorService: (id: string, data: Record<string, unknown>) => Promise<import("mongoose").Document<unknown, {}, IDoctor, {}, import("mongoose").DefaultSchemaOptions> & IDoctor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
};
//# sourceMappingURL=doctor.service.d.ts.map