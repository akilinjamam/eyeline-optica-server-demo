"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_controller_1 = require("./schedule.controller");
const auth_1 = require("../../app/middleware/auth");
const scheduleRoute = express_1.default.Router();
scheduleRoute.post("/create-schedule", schedule_controller_1.schemduleController.createScheduleWithSlotController);
scheduleRoute.get("/get-slot/:doctorId", schedule_controller_1.schemduleController.getAllSlotController);
scheduleRoute.get("/get-single-slot/:slotId", schedule_controller_1.schemduleController.getSingleSlotController);
scheduleRoute.patch("/update-video-status/:slotId", auth_1.protect, schedule_controller_1.schemduleController.updateVideoSlotController);
exports.default = scheduleRoute;
//# sourceMappingURL=schedule.route.js.map