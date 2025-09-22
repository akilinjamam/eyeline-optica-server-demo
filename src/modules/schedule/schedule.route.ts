import express from "express";
import { schemduleController } from "./schedule.controller";

const scheduleRoute = express.Router();

scheduleRoute.post("/create-schedule", schemduleController.createScheduleWithSlotController);

scheduleRoute.get("/get-slot", schemduleController.getAllSlotController);

export default scheduleRoute;
