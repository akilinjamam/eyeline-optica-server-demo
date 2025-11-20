import express from "express";
import { schemduleController } from "./schedule.controller";

const scheduleRoute = express.Router();

scheduleRoute.post("/create-schedule", schemduleController.createScheduleWithSlotController);

scheduleRoute.get("/get-slot/:doctorId", schemduleController.getAllSlotController);
scheduleRoute.get("/get-single-slot/:slotId", schemduleController.getSingleSlotController);

export default scheduleRoute;
