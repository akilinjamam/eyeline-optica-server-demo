import mongoose, { Document } from "mongoose";
export interface IWeeklyDeals extends Document {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    discountPercent: number;
    active: boolean;
    available?: boolean;
}
export declare const WeeklyDeals: mongoose.Model<IWeeklyDeals, {}, {}, {}, mongoose.Document<unknown, {}, IWeeklyDeals, {}, {}> & IWeeklyDeals & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=weeklydeals.model.d.ts.map