import mongoose from "mongoose";
import {
	addMinutes,
	combineDateTime,
	diffMinutes,
	iterateDatesInclusive,
} from "../../app/utils/time";
import { Schedule, Slot } from "./schedule.model";
import { AppError } from "../../app/errors/AppError";
import { StatusCodes } from "http-status-codes";
import { Doctor } from "../doctor/doctor.model";

const createScheduleWithSlotService = async (data: any) => {
	try {
		const { doctorId, startDate, endDate, startTime, endTime, totalPatients } = data;

		// basic validation
		if (!doctorId || !startDate || !endDate || !startTime || !endTime || !totalPatients) {
			throw new AppError(StatusCodes.NOT_FOUND, "Missing required fields");
		}

		const doctor = await Doctor.findById(doctorId);
		if (!doctor) throw new AppError(StatusCodes.NOT_FOUND, "Doctor not found");

		// calculate available minutes per day and overall
		const dateList = iterateDatesInclusive(startDate, endDate);
		if (dateList.length === 0) throw new AppError(StatusCodes.BAD_REQUEST, "Invalid date range");

		const minutesPerDay = diffMinutes(
			combineDateTime(startDate, startTime),
			combineDateTime(startDate, endTime)
		);

		if (minutesPerDay <= 0)
			throw new AppError(StatusCodes.BAD_REQUEST, "endTime must be after startTime");

		const totalAvailableMinutes = minutesPerDay * dateList.length;
		if (totalAvailableMinutes < 1) throw new AppError(StatusCodes.BAD_REQUEST, "No available time");

		// compute slotDuration in minutes (integer)
		const slotDuration = Math.floor(totalAvailableMinutes / totalPatients);
		if (slotDuration < 1) {
			throw new AppError(
				StatusCodes.BAD_REQUEST,
				"Too many patients for the available time. Increase time range or reduce totalPatients."
			);
		}

		// basic conflict check: see if doctor already has slots in any overlapping datetime range
		// We'll check if any existing slot for the doctor overlaps the new windows
		// Build overall window start & end
		const overallStart = combineDateTime(startDate, startTime);
		const overallEnd = combineDateTime(endDate, endTime);
		const conflict = await Slot.findOne({
			doctor: doctorId,
			$or: [
				{ startAt: { $lt: overallEnd }, endAt: { $gt: overallStart } }, // overlaps
			],
		}).lean();

		if (conflict) {
			throw new AppError(StatusCodes.CONFLICT, "Conflict with an existing slot for the doctor");
		}

		// create schedule doc
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const schedule = await new Schedule({
				doctor: doctorId,
				startDate,
				endDate,
				startTime,
				endTime,
				totalPatients,
			}).save({ session });

			const slotsToCreate = [];
			let slotsCreated = 0;

			outer: for (const dateStr of dateList) {
				let curStart = combineDateTime(dateStr, startTime);
				const dayEnd = combineDateTime(dateStr, endTime);

				while (
					curStart.getTime() + slotDuration * 60000 <= dayEnd.getTime() &&
					slotsCreated < totalPatients
				) {
					const curEnd = addMinutes(curStart, slotDuration);
					slotsToCreate.push({
						doctor: doctorId,
						schedule: schedule._id,
						startAt: curStart,
						endAt: curEnd,
						isBooked: false,
					});
					slotsCreated += 1;
					curStart = curEnd;
					if (slotsCreated >= totalPatients) break outer;
				}
				// continue next day
			}

			if (slotsCreated < totalPatients) {
				// not enough time to create requested slots
				await session.abortTransaction();
				session.endSession();
				throw new AppError(
					StatusCodes.BAD_REQUEST,
					`Could not allocate all requested slots with the given time window.${slotsCreated}`
				);
			}

			// bulk insert slots
			const createdSlots = await Slot.insertMany(slotsToCreate, { session });

			await session.commitTransaction();
			session.endSession();

			return {
				schedule,
				slotsCount: createdSlots.length,
				sampleSlot: createdSlots[0],
			};
		} catch (err) {
			await session.abortTransaction();
			session.endSession();
			throw err;
		}
	} catch (err) {
		console.error(err);
		throw new AppError(StatusCodes.BAD_REQUEST, "Server error");
	}
};

const getAllSlot = async (doctorId: string) => {
	const result = await Slot.find({ doctor: doctorId }).populate("doctor").populate("patient");
	return result;
};
const getSingleSlot = async (slotId: string) => {
	const result = await Slot.findOne({ _id: slotId }).populate("doctor").populate("patient");
	return result;
};
const updateVideoSlot = async (slotId: string, payload: Record<string, unknown>) => {
	const result = await Slot.findByIdAndUpdate(
		slotId,
		{ $set: payload },
		{ new: true, runValidators: true }
	);
	return result;
};

export const scheduleService = {
	createScheduleWithSlotService,
	getAllSlot,
	getSingleSlot,
	updateVideoSlot,
};
