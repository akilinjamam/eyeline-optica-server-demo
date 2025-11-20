import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { scheduleService } from "./schedule.service";

const createScheduleWithSlotController = catchAsync(async (req, res) => {
	const result = await scheduleService.createScheduleWithSlotService(req.body);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Schedule created successfully",
		data: result,
	});
});

const getAllSlotController = catchAsync(async (req, res) => {
	const { doctorId } = req.params;
	const result = await scheduleService.getAllSlot(doctorId as string);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Slot found successfully",
		data: result,
	});
});
const getSingleSlotController = catchAsync(async (req, res) => {
	const { slotId } = req.params;
	const result = await scheduleService.getSingleSlot(slotId as string);

	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Single Slot found successfully",
		data: result,
	});
});

export const schemduleController = {
	createScheduleWithSlotController,
	getAllSlotController,
	getSingleSlotController,
};
