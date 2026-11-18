import { StatusCodes } from "http-status-codes";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { analyticsService } from "./analytics.service";
import { ITrace } from "./analytics.model";

const createAnalyticsController = catchAsync(async (req, res) => {
	const { eventType, sessionId, productId, metaData, userInfo } = req.body as ITrace;
	const realVisitorIp = req.ip; // Express automatically unwraps x-forwarded-for safely now
	// req.headers["x-forwarded-for"] || (req.socket.remoteAddress as string)
	const data = {
		eventType,
		sessionId,
		productId,
		metaData,
		userInfo,
		deviceInfo: {
			userAgent: req.headers["user-agent"],
			ip: realVisitorIp,
		},
	};
	const result = await analyticsService.createAnalyticsService(data as ITrace);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Tracking created successfully",
		data: result,
	});
});

const getAnalyticsController = catchAsync(async (req, res) => {
	const { page, limit, date } = req.query;

	const queryParams = {
		page: page ? Math.max(1, Number(page)) : 1,
		limit: limit ? Math.max(1, Number(limit)) : 20,
		date: typeof date === "string" && date.trim() !== "" ? date.trim() : undefined,
	};

	const result = await analyticsService.getAnalyticsService(queryParams as any);

	sendResponse(res, {
		success: true,
		statusCode: StatusCodes.OK,
		message: "Tracked successfully",
		data: result.data,
		meta: result.meta,
	});
});

export const analyticsController = {
	createAnalyticsController,
	getAnalyticsController,
};
