import { Document, Types } from "mongoose";
export interface IPatient extends Document {
    name: string;
    phone: string;
    age: number;
    address: string;
    doctorId: Types.ObjectId;
    slotId: Types.ObjectId;
}
export declare const Patient: import("mongoose").Model<IPatient, {}, {}, {}, Document<unknown, {}, IPatient, {}, {}> & IPatient & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=patient.model.d.ts.map