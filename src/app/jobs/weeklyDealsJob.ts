import cron from "node-cron";
import { WeeklyDeals } from "../../modules/weeklyDeals/weeklydeals.model";
import Product from "../../modules/products/products.model";
import { Lens } from "../../modules/lenses/lenses.model";
import ContactLens from "../../modules/contactLens/contactlens.model";
import Accessory from "../../modules/accessory/accessory.model";

cron.schedule("*/10 * * * *", async () => {
	// console.log("🕒 Checking for expired deals...", new Date().toLocaleTimeString());

	const now = new Date();

	try {
		// Find expired deals
		const expiredDeals = await WeeklyDeals.find({
			endDate: { $lt: now },
			active: true,
		});

		if (expiredDeals.length > 0) {
			// console.log(`⚠️ Found ${expiredDeals.length} expired deals.`);

			// Mark those deals as inactive
			await WeeklyDeals.updateMany({ endDate: { $lt: now } }, { $set: { active: false } });

			// Reset weeklyDeals field in all collections
			await Promise.all([
				Product.updateMany({ weeklyDeals: true }, { $set: { weeklyDeals: false } }),
				Lens.updateMany({ weeklyDeals: true }, { $set: { weeklyDeals: false } }),
				ContactLens.updateMany({ weeklyDeals: true }, { $set: { weeklyDeals: false } }),
				Accessory.updateMany({ weeklyDeals: true }, { $set: { weeklyDeals: false } }),
			]);

			// console.log("✅ All weeklyDeals flags reset successfully.");
		} else {
			// console.log("No expired deals found.");
		}
	} catch (err) {
		console.error("❌ Weekly deals job error:", err);
	}
});
