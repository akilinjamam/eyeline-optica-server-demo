import express from "express";
import { StockControllers } from "./stock.controller";
import validateRequest from "../../../app/middleware/validateRequest";
import { StockValidations } from "./stock.zod";

const router = express.Router();

router.post(
	"/create-stock-fcb",
	validateRequest(StockValidations.createStockValidationSchema),
	StockControllers.createStock
);

// Supports ?productId=...&supplierId=...&searchTerm=...
router.get("/get-stock-fcb", StockControllers.getAllStocks);

router.get("/get-single-stock-fcb/:id", StockControllers.getSingleStock);

router.patch(
	"/update-stock-fcb/:id",
	validateRequest(StockValidations.updateStockValidationSchema),
	StockControllers.updateStock
);

router.delete("/delete-stock-fcb/:id", StockControllers.deleteStock);

export const StockRoutes = router;
