import { TPrescription } from "./prescription.type";
export declare const prescriptionService: {
    createPrescriptionService: (payload: TPrescription) => Promise<import("mongoose").Document<unknown, {}, import("./prescription.model").IPrescription, {}, {}> & import("./prescription.model").IPrescription & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllPrescription: (query: Record<string, unknown>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./prescription.model").IPrescription, {}, {}> & import("./prescription.model").IPrescription & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    getSinglePrescription: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("./prescription.model").IPrescription, {}, {}> & import("./prescription.model").IPrescription & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updatePrescription: (payload: Record<string, unknown>, id: string) => Promise<(import("mongoose").Document<unknown, {}, import("./prescription.model").IPrescription, {}, {}> & import("./prescription.model").IPrescription & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deletePrescription: (ids: string[]) => Promise<import("mongodb").DeleteResult>;
};
//# sourceMappingURL=prescription.service.d.ts.map