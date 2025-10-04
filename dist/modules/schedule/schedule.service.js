"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const time_1 = require("../../app/utils/time");
const schedule_model_1 = require("./schedule.model");
const AppError_1 = require("../../app/errors/AppError");
const http_status_codes_1 = require("http-status-codes");
const doctor_model_1 = require("../doctor/doctor.model");
const createScheduleWithSlotService = async (data) => {
    try {
        const { doctorId, startDate, endDate, startTime, endTime, totalPatients } = data;
        // basic validation
        if (!doctorId || !startDate || !endDate || !startTime || !endTime || !totalPatients) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Missing required fields");
        }
        const doctor = await doctor_model_1.Doctor.findById(doctorId);
        if (!doctor)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Doctor not found");
        // calculate available minutes per day and overall
        const dateList = (0, time_1.iterateDatesInclusive)(startDate, endDate);
        if (dateList.length === 0)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid date range");
        const minutesPerDay = (0, time_1.diffMinutes)((0, time_1.combineDateTime)(startDate, startTime), (0, time_1.combineDateTime)(startDate, endTime));
        if (minutesPerDay <= 0)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "endTime must be after startTime");
        const totalAvailableMinutes = minutesPerDay * dateList.length;
        if (totalAvailableMinutes < 1)
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No available time");
        // compute slotDuration in minutes (integer)
        const slotDuration = Math.floor(totalAvailableMinutes / totalPatients);
        if (slotDuration < 1) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Too many patients for the available time. Increase time range or reduce totalPatients.");
        }
        // basic conflict check: see if doctor already has slots in any overlapping datetime range
        // We'll check if any existing slot for the doctor overlaps the new windows
        // Build overall window start & end
        const overallStart = (0, time_1.combineDateTime)(startDate, startTime);
        const overallEnd = (0, time_1.combineDateTime)(endDate, endTime);
        const conflict = await schedule_model_1.Slot.findOne({
            doctor: doctorId,
            $or: [
                { startAt: { $lt: overallEnd }, endAt: { $gt: overallStart } }, // overlaps
            ],
        }).lean();
        if (conflict) {
            throw new AppError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "Conflict with an existing slot for the doctor");
        }
        // create schedule doc
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const schedule = await new schedule_model_1.Schedule({
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
                let curStart = (0, time_1.combineDateTime)(dateStr, startTime);
                const dayEnd = (0, time_1.combineDateTime)(dateStr, endTime);
                while (curStart.getTime() + slotDuration * 60000 <= dayEnd.getTime() &&
                    slotsCreated < totalPatients) {
                    const curEnd = (0, time_1.addMinutes)(curStart, slotDuration);
                    slotsToCreate.push({
                        doctor: doctorId,
                        schedule: schedule._id,
                        startAt: curStart,
                        endAt: curEnd,
                        isBooked: false,
                    });
                    slotsCreated += 1;
                    curStart = curEnd;
                    if (slotsCreated >= totalPatients)
                        break outer;
                }
                // continue next day
            }
            if (slotsCreated < totalPatients) {
                // not enough time to create requested slots
                await session.abortTransaction();
                session.endSession();
                throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, `Could not allocate all requested slots with the given time window.${slotsCreated}`);
            }
            // bulk insert slots
            const createdSlots = await schedule_model_1.Slot.insertMany(slotsToCreate, { session });
            await session.commitTransaction();
            session.endSession();
            return {
                schedule,
                slotsCount: createdSlots.length,
                sampleSlot: createdSlots[0],
            };
        }
        catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
    }
    catch (err) {
        console.error(err);
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Server error");
    }
};
const getAllSlot = async (doctorId) => {
    const result = await schedule_model_1.Slot.find({ doctor: doctorId }).populate("doctor");
    return result;
};
exports.scheduleService = {
    createScheduleWithSlotService,
    getAllSlot,
};
//# sourceMappingURL=schedule.service.js.map