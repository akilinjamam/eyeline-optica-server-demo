import { Types } from "mongoose";

export interface ISchedule {
	doctor: Types.ObjectId;
	startDate: string; // YYYY-MM-DD
	endDate: string; // YYYY-MM-DD
	startTime: string; // HH:mm
	endTime: string; // HH:mm
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
