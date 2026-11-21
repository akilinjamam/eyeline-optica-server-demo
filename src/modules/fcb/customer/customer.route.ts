import express from "express";
import { CustomerControllers } from "./customer.controller";
import validateRequest from "../../../app/middleware/validateRequest";
import { CustomerValidations } from "./customer.zod";

const router = express.Router();

router.post(
	"/create-customer-fcb",
	validateRequest(CustomerValidations.createFcbCustomerValidationSchema),
	CustomerControllers.createCustomer
);

// Supports ?type=retail|wholesale&hasDue=true&isActive=true&searchTerm=...
router.get("/get-customer-fcb", CustomerControllers.getAllCustomers);

router.get("/get-single-customer-fcb/:id", CustomerControllers.getSingleCustomer);

router.patch(
	"/get-update-customer-fcb/:id",
	validateRequest(CustomerValidations.updateFcbCustomerValidationSchema),
	CustomerControllers.updateCustomer
);

router.delete("/delete-update-fcb/:id", CustomerControllers.deleteCustomer);

export const CustomerFcbRoutes = router;
