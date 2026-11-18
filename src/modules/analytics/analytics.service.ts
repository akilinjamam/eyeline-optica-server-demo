import Trace, { ITrace } from "./analytics.model";

const createAnalyticsService = async (payload: ITrace) => {
	const result = await Trace.create(payload);
	return result;
};

export interface GetAnalyticsParams {
	page?: number;
	limit?: number;
	date?: string; // Expected format: "YYYY-MM-DD"
}

const getAnalyticsService = async ({ page = 1, limit = 20, date }: GetAnalyticsParams) => {
	const skip = (page - 1) * limit;

	// 1. Build Date Filter ($match)
	let dateMatch: Record<string, any> = {};

	if (date) {
		const startOfDay = new Date(`${date}T00:00:00.000Z`);
		const endOfDay = new Date(`${date}T23:59:59.999Z`);
		dateMatch = {
			createdAt: { $gte: startOfDay, $lte: endOfDay },
		};
	} else {
		// Default: Last 5 days only (including today)
		const fiveDaysAgo = new Date();
		fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 4);
		fiveDaysAgo.setHours(0, 0, 0, 0);
		dateMatch = {
			createdAt: { $gte: fiveDaysAgo },
		};
	}

	const pipeline: any[] = [
		// Filter early using index on createdAt
		{ $match: dateMatch },

		// Sort chronologically so $last picks the latest userAgent
		{ $sort: { createdAt: 1 } },

		// Normalize empty strings ("") to null
		{
			$addFields: {
				cleanName: {
					$cond: [
						{
							$and: [{ $ne: ["$userInfo.name", null] }, { $ne: ["$userInfo.name", ""] }],
						},
						"$userInfo.name",
						null,
					],
				},
				cleanPhone: {
					$cond: [
						{
							$and: [{ $ne: ["$userInfo.phone", null] }, { $ne: ["$userInfo.phone", ""] }],
						},
						"$userInfo.phone",
						null,
					],
				},
				cleanAddress: {
					$cond: [
						{
							$and: [{ $ne: ["$userInfo.address", null] }, { $ne: ["$userInfo.address", ""] }],
						},
						"$userInfo.address",
						null,
					],
				},
			},
		},

		// Group by Date + Session + EventType
		{
			$group: {
				_id: {
					date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
					sessionId: "$sessionId",
					eventType: "$eventType",
				},
				count: { $sum: 1 },
				lastSeen: { $max: "$createdAt" },
				userName: { $max: "$cleanName" },
				userPhone: { $max: "$cleanPhone" },
				userAddress: { $max: "$cleanAddress" },
				metaDataList: {
					$addToSet: {
						$cond: [
							{
								$and: [
									{ $ne: ["$metaData", null] },
									{
										$or: [{ $gt: ["$metaData.name", null] }, { $gt: ["$metaData.price", null] }],
									},
								],
							},
							{
								name: "$metaData.name",
								price: "$metaData.price",
							},
							"$$REMOVE",
						],
					},
				},
				userAgent: { $last: "$deviceInfo.userAgent" },
			},
		},

		// Group by Date + Session
		{
			$group: {
				_id: {
					date: "$_id.date",
					sessionId: "$_id.sessionId",
				},
				pageVisits: {
					$push: {
						page: "$_id.eventType",
						visits: "$count",
					},
				},
				totalHits: { $sum: "$count" },
				lastActivity: { $max: "$lastSeen" },
				resolvedName: { $max: "$userName" },
				resolvedPhone: { $max: "$userPhone" },
				resolvedAddress: { $max: "$userAddress" },
				rawMetaArrays: { $push: "$metaDataList" },
				userAgent: { $last: "$userAgent" },
			},
		},

		// Shape userInfo and flatten metaData
		{
			$addFields: {
				userInfo: {
					name: "$resolvedName",
					phone: "$resolvedPhone",
					address: "$resolvedAddress",
				},
				metaData: {
					$reduce: {
						input: "$rawMetaArrays",
						initialValue: [],
						in: { $setUnion: ["$$value", "$$this"] },
					},
				},
			},
		},

		// Calculate true total sessions per date BEFORE paginating 20 items
		{
			$setWindowFields: {
				partitionBy: "$_id.date",
				output: {
					dateTotalSessions: { $count: {} },
				},
			},
		},

		// Sort sessions newest-first BEFORE paginating 20 sessions
		{ $sort: { "_id.date": -1, lastActivity: -1 } },

		// Paginate 20 sessions and re-group by date while keeping the true per-date total
		{
			$facet: {
				metadata: [{ $count: "totalSessions" }],
				paginatedSessions: [
					{ $skip: skip },
					{ $limit: limit },
					{
						$group: {
							_id: "$_id.date",
							totalSessions: { $first: "$dateTotalSessions" }, // <-- True total for this date
							sessions: {
								$push: {
									sessionId: "$_id.sessionId",
									pageVisits: "$pageVisits",
									totalHits: "$totalHits",
									lastActivity: "$lastActivity",
									userInfo: "$userInfo",
									metaData: "$metaData",
									userAgent: "$userAgent",
								},
							},
						},
					},
					{ $sort: { _id: -1 } },
				],
			},
		},
	];

	const [result] = await Trace.aggregate(pipeline);
	const totalSessions = result?.metadata?.[0]?.totalSessions || 0;
	const data = result?.paginatedSessions || [];

	return {
		data,
		meta: {
			page,
			limit,
			totalSessions,
			hasMore: skip + limit < totalSessions,
		},
	};
};

export const analyticsService = {
	createAnalyticsService,
	getAnalyticsService,
};
