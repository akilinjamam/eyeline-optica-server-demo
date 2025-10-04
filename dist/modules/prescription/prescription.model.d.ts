import mongoose, { Document, Model } from "mongoose";
type Medicine = {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
};
export interface IPrescription extends Document {
    doctorId: mongoose.Types.ObjectId;
    patientId: mongoose.Types.ObjectId;
    date: string;
    diagnosis: string;
    medicines: Medicine[];
    tests: string;
    advice: string;
}
export declare const Prescription: Model<IPrescription>;
export {};
//# sourceMappingURL=prescription.model.d.ts.map