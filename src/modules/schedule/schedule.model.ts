import { Schema } from "mongoose";
import { ISchedule, ISlot } from "./schedule.type";
import { model } from "mongoose";

const ScheduleSchema = new Schema<ISchedule>({
	doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
	startDate: { type: String, required: true },
	endDate: { type: String, required: true },
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	totalPatients: { type: Number, required: true },
	createdAt: { type: Date, default: () => new Date() },
});

export const Schedule = model<ISchedule>("Schedule", ScheduleSchema);

const SlotSchema = new Schema<ISlot>({
	doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
	schedule: { type: Schema.Types.ObjectId, ref: "Schedule", required: true },
	startAt: { type: Date, required: true },
	endAt: { type: Date, required: true },
	isBooked: { type: Boolean, default: false },
	patient: { type: Schema.Types.ObjectId, ref: "Patient", default: null },
	isVideo: { type: Boolean, default: false },
	isPrescription: { type: Boolean, default: false },
});

SlotSchema.index({ doctor: 1, startAt: 1, endAt: 1 }); // helpful for conflict queries

export const Slot = model<ISlot>("Slot", SlotSchema);
