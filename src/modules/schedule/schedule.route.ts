import express from "express";
import { schemduleController } from "./schedule.controller";
import { protect } from "../../app/middleware/auth";

const scheduleRoute = express.Router();

scheduleRoute.post("/create-schedule", schemduleController.createScheduleWithSlotController);

scheduleRoute.get("/get-slot/:doctorId", schemduleController.getAllSlotController);
scheduleRoute.get("/get-single-slot/:slotId", schemduleController.getSingleSlotController);
scheduleRoute.patch(
	"/update-video-status/:slotId",
	protect,
	schemduleController.updateVideoSlotController
);

export default scheduleRoute;
