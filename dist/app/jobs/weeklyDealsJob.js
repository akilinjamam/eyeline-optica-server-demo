"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const weeklydeals_model_1 = require("../../modules/weeklyDeals/weeklydeals.model");
const products_model_1 = __importDefault(require("../../modules/products/products.model"));
const lenses_model_1 = require("../../modules/lenses/lenses.model");
const contactlens_model_1 = __importDefault(require("../../modules/contactLens/contactlens.model"));
const accessory_model_1 = __importDefault(require("../../modules/accessory/accessory.model"));
node_cron_1.default.schedule("*/10 * * * *", async () => {
    // console.log("🕒 Checking for expired deals...", new Date().toLocaleTimeString());
    const now = new Date();
    try {
        // Find expired deals
        const expiredDeals = await weeklydeals_model_1.WeeklyDeals.find({
            endDate: { $lt: now },
            active: true,
        });
        if (expiredDeals.length > 0) {
            // console.log(`⚠️ Found ${expiredDeals.length} expired deals.`);
            // Mark those deals as inactive
            await weeklydeals_model_1.WeeklyDeals.updateMany({ endDate: { $lt: now } }, { $set: { active: false } });
            // Reset weeklyDeals field in all collections
            await Promise.all([
                products_model_1.default.updateMany({ weeklyDeals: true }, { $set: { weeklyDeals: false } }),
                lenses_model_1.Lens.updateMany({ weeklyDeals: true }, { $set: { weeklyDeals: false } }),
                contactlens_model_1.default.updateMany({ weeklyDeals: true }, { $set: { weeklyDeals: false } }),
                accessory_model_1.default.updateMany({ weeklyDeals: true }, { $set: { weeklyDeals: false } }),
            ]);
            // console.log("✅ All weeklyDeals flags reset successfully.");
        }
        else {
            // console.log("No expired deals found.");
        }
    }
    catch (err) {
        console.error("❌ Weekly deals job error:", err);
    }
});
//# sourceMappingURL=weeklyDealsJob.js.map