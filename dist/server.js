"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
require("./app/jobs/weeklyDealsJob");
const port = config_1.default.port;
const main = async () => {
    try {
        await mongoose_1.default.connect(config_1.default.db_url);
        app_1.default.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
main();
//# sourceMappingURL=server.js.map