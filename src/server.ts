import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import "./app/jobs/weeklyDealsJob";
import "./app/jobs/cleanupOldSchedules";

const port = config.port;

const main = async () => {
	try {
		await mongoose.connect(config.db_url as string);

		app.listen(port, () => {
			console.log(`🚀 Server running on http://localhost:${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

main();
