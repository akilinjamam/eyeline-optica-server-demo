import express from "express";
import { ProductControllers } from "./product.controller";
import validateRequest from "../../../app/middleware/validateRequest";
import { ProductValidations } from "./product.zod";

const router = express.Router();

router.post(
	"/create-fcb-product",
	validateRequest(ProductValidations.createProductValidationSchema),
	ProductControllers.createProduct
);

router.get("/get-fcb-product", ProductControllers.getAllProducts);

// Accepts either MongoDB ObjectId or product slug
router.get("/get-fcb-product-id/:id", ProductControllers.getSingleProduct);

router.patch(
	"/update-fcb-product-id/:id",
	validateRequest(ProductValidations.updateProductValidationSchema),
	ProductControllers.updateProduct
);

router.delete("/delete-fcb-product-id/:id", ProductControllers.deleteProduct);

export const ProductRoutes = router;
