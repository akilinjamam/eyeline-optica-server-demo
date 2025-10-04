"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_controller_1 = require("./schedule.controller");
const scheduleRoute = express_1.default.Router();
scheduleRoute.post("/create-schedule", schedule_controller_1.schemduleController.createScheduleWithSlotController);
scheduleRoute.get("/get-slot/:doctorId", schedule_controller_1.schemduleController.getAllSlotController);
exports.default = scheduleRoute;
//# sourceMappingURL=schedule.route.js.map