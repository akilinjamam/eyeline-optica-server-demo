import express from "express";
import { schemduleController } from "./schedule.controller";

const scheduleRoute = express.Router();

scheduleRoute.post("/create-schedule", schemduleController.createScheduleWithSlotController);

export default scheduleRoute;
