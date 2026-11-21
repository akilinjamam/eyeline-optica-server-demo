import express from "express";
import { SupplierControllers } from "./supplier.controller";
import validateRequest from "../../../app/middleware/validateRequest";
import { SupplierValidations } from "./supplier.zod";

const router = express.Router();

router.post(
	"/create-supplier",
	validateRequest(SupplierValidations.createSupplierValidationSchema),
	SupplierControllers.createSupplier
);

// Supports ?hasDue=true, ?isActive=true, ?searchTerm=...
router.get("/get-supplier", SupplierControllers.getAllSuppliers);

router.get("/get-single-supplier/:id", SupplierControllers.getSingleSupplier);

router.patch(
	"/update-single-supplier/:id",
	validateRequest(SupplierValidations.updateSupplierValidationSchema),
	SupplierControllers.updateSupplier
);

router.delete("/delete-supplier/:id", SupplierControllers.deleteSupplier);

export const SupplierRoutes = router;
