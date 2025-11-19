import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { agoraTokenService } from "./agora.service";

const createAgoraTokenController = catchAsync(async (req, res) => {
	const result = await agoraTokenService.createAgoraTokenService(req.body);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Agora token created successfully",
		data: result,
	});
});

export const agoraTokenController = {
	createAgoraTokenController,
};
