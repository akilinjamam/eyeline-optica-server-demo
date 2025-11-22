import mongoose from "mongoose";
export declare const scheduleService: {
    createScheduleWithSlotService: (data: any) => Promise<{
        schedule: mongoose.Document<unknown, {}, import("./schedule.type").ISchedule, {}, {}> & import("./schedule.type").ISchedule & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        };
        slotsCount: number;
        sampleSlot: mongoose.MergeType<mongoose.Document<unknown, {}, import("./schedule.type").ISlot, {}, {}> & import("./schedule.type").ISlot & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, Omit<{
            doctor: any;
            schedule: mongoose.Types.ObjectId;
            startAt: Date;
            endAt: Date;
            isBooked: boolean;
        }[], "_id">> | undefined;
    }>;
    getAllSlot: (doctorId: string) => Promise<(mongoose.Document<unknown, {}, import("./schedule.type").ISlot, {}, {}> & import("./schedule.type").ISlot & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getSingleSlot: (slotId: string) => Promise<(mongoose.Document<unknown, {}, import("./schedule.type").ISlot, {}, {}> & import("./schedule.type").ISlot & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateVideoSlot: (slotId: string, payload: Record<string, unknown>) => Promise<(mongoose.Document<unknown, {}, import("./schedule.type").ISlot, {}, {}> & import("./schedule.type").ISlot & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=schedule.service.d.ts.map