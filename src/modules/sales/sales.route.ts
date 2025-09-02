import express from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { salesItemSchema } from "./sales.validation";
import { salesController } from "./sales.controller";

const salesRouter = express.Router();

salesRouter.post(
	"/create-sales",
	validateRequest(salesItemSchema),
	salesController.createSalesController
);

salesRouter.get("/", salesController.getAllSalesController);

export default salesRouter;
