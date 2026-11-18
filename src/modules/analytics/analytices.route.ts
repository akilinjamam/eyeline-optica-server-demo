import express from "express";
import { analyticsController } from "./analytics.controller";
import { protect } from "../../app/middleware/auth";

const analyticsRoute = express.Router();

analyticsRoute.post("/create-analytics", analyticsController.createAnalyticsController);
analyticsRoute.get("/", protect, analyticsController.getAnalyticsController);
export default analyticsRoute;
