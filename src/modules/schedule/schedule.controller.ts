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

export const schemduleController = {
	createScheduleWithSlotController,
};
