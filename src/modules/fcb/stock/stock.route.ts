import express from "express";
import { StockControllers } from "./stock.controller";
import validateRequest from "../../../app/middleware/validateRequest";
import { StockValidations } from "./stock.zod";

const router = express.Router();

router.post(
	"/",
	validateRequest(StockValidations.createStockValidationSchema),
	StockControllers.createStock
);

// Supports ?productId=...&supplierId=...&searchTerm=...
router.get("/", StockControllers.getAllStocks);

router.get("/:id", StockControllers.getSingleStock);

router.patch(
	"/:id",
	validateRequest(StockValidations.updateStockValidationSchema),
	StockControllers.updateStock
);

router.delete("/:id", StockControllers.deleteStock);

export const StockRoutes = router;
