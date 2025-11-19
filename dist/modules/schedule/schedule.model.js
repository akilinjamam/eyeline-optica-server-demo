"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = exports.Schedule = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const ScheduleSchema = new mongoose_1.Schema({
    doctor: { type: mongoose_1.Schema.Types.ObjectId, ref: "Doctor", required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    totalPatients: { type: Number, required: true },
    createdAt: { type: Date, default: () => new Date() },
});
exports.Schedule = (0, mongoose_2.model)("Schedule", ScheduleSchema);
const SlotSchema = new mongoose_1.Schema({
    doctor: { type: mongoose_1.Schema.Types.ObjectId, ref: "Doctor", required: true },
    schedule: { type: mongoose_1.Schema.Types.ObjectId, ref: "Schedule", required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    isBooked: { type: Boolean, default: false },
    patient: { type: mongoose_1.Schema.Types.ObjectId, ref: "Patient", default: null },
    isVideo: { type: Boolean, default: false },
    isPrescription: { type: Boolean, default: false },
});
SlotSchema.index({ doctor: 1, startAt: 1, endAt: 1 }); // helpful for conflict queries
exports.Slot = (0, mongoose_2.model)("Slot", SlotSchema);
//# sourceMappingURL=schedule.model.js.map