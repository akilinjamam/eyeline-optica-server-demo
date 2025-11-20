import cron from "node-cron";
import { Schedule, Slot } from "../../modules/schedule/schedule.model";

// Runs every night at 12:30 AM
cron.schedule("30 0 * * *", async () => {
	try {
		console.log("🧹 Running daily cleanup job...");

		const today = new Date();
		today.setHours(0, 0, 0, 0); // Normalize

		/* ===========================================
       DELETE OLD SCHEDULES
       Logic:
       endDate < today (converted to date)
    ============================================= */

		const oldSchedules = await Schedule.find({
			endDate: { $lt: today.toISOString().split("T")[0] },
		}).select("_id");

		const oldScheduleIds = oldSchedules.map((s) => s._id);

		if (oldScheduleIds.length > 0) {
			await Schedule.deleteMany({ _id: { $in: oldScheduleIds } });
			console.log(`🗑 Deleted ${oldScheduleIds.length} old schedules`);
		}

		/* ===========================================
       DELETE OLD SLOTS
       Logic:
       endAt < today
    ============================================= */

		const slotDeleteResult = await Slot.deleteMany({
			endAt: { $lt: today },
		});

		if (slotDeleteResult.deletedCount > 0) {
			console.log(`🗑 Deleted ${slotDeleteResult.deletedCount} old slots`);
		}

		console.log("✅ Cleanup job finished.\n");
	} catch (err) {
		console.error("❌ Error running cleanup job:", err);
	}
});
