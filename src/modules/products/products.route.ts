import express from "express";
import { upload } from "../../app/middleware/multer";
import { productController } from "./products.controller";
import { productSchema } from "./products.validation";
import validateRequest from "../../app/middleware/validateRequest";
import combineImagesWithTextDataForFrame from "../../app/middleware/combineImageWithTextDataForFrame";

const productrouter = express.Router();

productrouter.post(
	"/create-product",
	upload.any(),
	combineImagesWithTextDataForFrame,
	validateRequest(productSchema),
	productController.createProductController
);

productrouter.get("/", productController.getAllProductController);
productrouter.get("/get-single-product/:id", productController.getSingleProductController);
productrouter.put(
	"/update-product/:id",
	upload.any(),
	combineImagesWithTextDataForFrame,
	productController.updateProductController
);
productrouter.delete("/delete-product", productController.deleteProductController);

export default productrouter;
