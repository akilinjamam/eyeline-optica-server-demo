import { Types } from "mongoose";
export interface ISchedule {
    doctor: Types.ObjectId;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    totalPatients: number;
    createdAt: Date;
}
export interface ISlot {
    doctor: Types.ObjectId;
    schedule: Types.ObjectId;
    startAt: Date;
    endAt: Date;
    isBooked: boolean;
    patient?: Types.ObjectId | null;
    isVideo?: boolean;
    isPrescription?: boolean;
}
//# sourceMappingURL=schedule.type.d.ts.map