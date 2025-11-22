import { Types } from "mongoose";
export interface IReview {
    doctor: Types.ObjectId | IDoctor;
    reviewerName: string;
    comment: string;
    rating: number;
    date: Date;
}
export interface IDoctor {
    name?: string;
    email: string;
    specialities?: string[];
    studies?: string[];
    totalExperience?: number;
    bmdcNumber?: string;
    currentlyWorking?: string;
    description?: string;
    experienceDetail?: string;
    images?: string[];
    appointmentFee?: number;
    clinicName?: string;
    clinicAddress?: string;
    phone?: string;
}
//# sourceMappingURL=doctor.types.d.ts.map