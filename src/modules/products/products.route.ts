import express from "express";
import { upload } from "../../app/middleware/multer";
import { productController } from "./products.controller";
import { productSchema } from "./products.validation";
import validateRequest from "../../app/middleware/validateRequest";
import combineImagesWithTextData from "../../app/middleware/combineImagesWithData";

const productrouter = express.Router();

productrouter.post(
	"/create-product",
	upload.array("images", 10),
	combineImagesWithTextData,
	validateRequest(productSchema),
	productController.createProductController
);

productrouter.get("/", productController.getAllProductController);
productrouter.get("/get-single-product/:id", productController.getSingleProductController);
productrouter.put(
	"/update-product/:id",
	upload.array("images", 10),
	combineImagesWithTextData,
	productController.updateProductController
);
productrouter.delete("/delete-product", productController.deleteProductController);

export default productrouter;
