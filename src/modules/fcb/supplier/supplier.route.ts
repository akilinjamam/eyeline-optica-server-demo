import express from "express";
import { SupplierControllers } from "./supplier.controller";
import validateRequest from "../../../app/middleware/validateRequest";
import { SupplierValidations } from "./supplier.zod";

const router = express.Router();

router.post(
	"/create-supplier-fcb",
	validateRequest(SupplierValidations.createSupplierValidationSchema),
	SupplierControllers.createSupplier
);

// Supports ?hasDue=true, ?isActive=true, ?searchTerm=...
router.get("/get-supplier-fcb", SupplierControllers.getAllSuppliers);

router.get("/get-single-supplier-fcb/:id", SupplierControllers.getSingleSupplier);

router.patch(
	"/update-single-supplier-fcb/:id",
	validateRequest(SupplierValidations.updateSupplierValidationSchema),
	SupplierControllers.updateSupplier
);

router.delete("/delete-supplier-fcb/:id", SupplierControllers.deleteSupplier);

export const SupplierRoutes = router;
