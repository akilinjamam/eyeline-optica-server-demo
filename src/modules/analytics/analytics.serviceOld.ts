// const getAnalyticsService = async () => {
// 	const groupedData = await Trace.aggregate([
// 		// 1. Sort chronologically
// 		{ $sort: { createdAt: 1 } },

// 		// 2. Normalize empty strings ("") to null so $max never prefers "" over real data
// 		{
// 			$addFields: {
// 				cleanName: {
// 					$cond: [
// 						{ $and: [{ $ne: ["$userInfo.name", null] }, { $ne: ["$userInfo.name", ""] }] },
// 						"$userInfo.name",
// 						null,
// 					],
// 				},
// 				cleanPhone: {
// 					$cond: [
// 						{ $and: [{ $ne: ["$userInfo.phone", null] }, { $ne: ["$userInfo.phone", ""] }] },
// 						"$userInfo.phone",
// 						null,
// 					],
// 				},
// 				cleanAddress: {
// 					$cond: [
// 						{ $and: [{ $ne: ["$userInfo.address", null] }, { $ne: ["$userInfo.address", ""] }] },
// 						"$userInfo.address",
// 						null,
// 					],
// 				},
// 			},
// 		},

// 		// 3. Group by Date + Session + EventType
// 		{
// 			$group: {
// 				_id: {
// 					date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
// 					sessionId: "$sessionId",
// 					eventType: "$eventType",
// 				},
// 				count: { $sum: 1 },
// 				lastSeen: { $max: "$createdAt" },
// 				// $max ignores null and keeps any valid string within this eventType
// 				userName: { $max: "$cleanName" },
// 				userPhone: { $max: "$cleanPhone" },
// 				userAddress: { $max: "$cleanAddress" },
// 				// Collect all unique non-null metaData objects
// 				metaDataList: {
// 					$addToSet: {
// 						$cond: [
// 							{
// 								$and: [
// 									{ $ne: ["$metaData", null] },
// 									{
// 										$or: [{ $gt: ["$metaData.name", null] }, { $gt: ["$metaData.price", null] }],
// 									},
// 								],
// 							},
// 							{
// 								name: "$metaData.name",
// 								price: "$metaData.price",
// 							},
// 							"$$REMOVE",
// 						],
// 					},
// 				},
// 				userAgent: { $last: "$deviceInfo.userAgent" },
// 			},
// 		},

// 		// 4. Group by Date + Session — MUST use $max again so non-null Checkout userInfo beats null Home userInfo
// 		{
// 			$group: {
// 				_id: {
// 					date: "$_id.date",
// 					sessionId: "$_id.sessionId",
// 				},
// 				pageVisits: {
// 					$push: {
// 						page: "$_id.eventType",
// 						visits: "$count",
// 					},
// 				},
// 				totalHits: { $sum: "$count" },
// 				lastActivity: { $max: "$lastSeen" },
// 				resolvedName: { $max: "$userName" },
// 				resolvedPhone: { $max: "$userPhone" },
// 				resolvedAddress: { $max: "$userAddress" },
// 				rawMetaArrays: { $push: "$metaDataList" },
// 				userAgent: { $last: "$userAgent" },
// 			},
// 		},

// 		// 5. Shape userInfo object and flatten deduplicated metaData array
// 		{
// 			$addFields: {
// 				userInfo: {
// 					name: "$resolvedName",
// 					phone: "$resolvedPhone",
// 					address: "$resolvedAddress",
// 				},
// 				metaData: {
// 					$reduce: {
// 						input: "$rawMetaArrays",
// 						initialValue: [],
// 						in: { $setUnion: ["$$value", "$$this"] },
// 					},
// 				},
// 			},
// 		},

// 		// 6. Final Group by Date
// 		{
// 			$group: {
// 				_id: "$_id.date",
// 				totalSessions: { $sum: 1 },
// 				sessions: {
// 					$push: {
// 						sessionId: "$_id.sessionId",
// 						pageVisits: "$pageVisits",
// 						totalHits: "$totalHits",
// 						lastActivity: "$lastActivity",
// 						userInfo: "$userInfo",
// 						metaData: "$metaData",
// 						userAgent: "$userAgent",
// 					},
// 				},
// 			},
// 		},

// 		// 7. Sort newest dates first
// 		{ $sort: { _id: -1 } },
// 	]);

// 	return groupedData;
// };
